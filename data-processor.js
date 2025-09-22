// Web Worker para procesamiento pesado de datos
let cachedData = null;

self.onmessage = function(e) {
    const { type, data, filters } = e.data;
    
    try {
        switch(type) {
            case 'PROCESS_DATA':
                cachedData = data;
                const processedData = processData(data, filters);
                self.postMessage({
                    type: 'DATA_PROCESSED',
                    data: processedData
                });
                break;
                
            case 'APPLY_FILTERS':
                if (!cachedData) {
                    self.postMessage({
                        type: 'ERROR',
                        data: 'No hay datos para filtrar'
                    });
                    return;
                }
                const filteredData = applyFilters(cachedData, filters);
                self.postMessage({
                    type: 'FILTER_APPLIED',
                    data: filteredData
                });
                break;
                
            case 'SORT_MACHINES':
                if (!cachedData) {
                    self.postMessage({
                        type: 'ERROR',
                        data: 'No hay datos para ordenar'
                    });
                    return;
                }
                const sortedData = sortMachines(cachedData, filters);
                self.postMessage({
                    type: 'SORT_APPLIED',
                    data: sortedData
                });
                break;
        }
    } catch (error) {
        self.postMessage({
            type: 'ERROR',
            data: error.message
        });
    }
};

function processData(html, filters) {
    // Crear un parser de HTML para extraer información
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extraer todas las máquinas
    const machineCards = doc.querySelectorAll('.machine-card');
    
    // Aplicar filtros iniciales
    return applyFiltersToNodes(machineCards, filters);
}

function applyFilters(html, filters) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const machineCards = doc.querySelectorAll('.machine-card');
    
    return applyFiltersToNodes(machineCards, filters);
}

function applyFiltersToNodes(machineCards, filters) {
    let filteredHtml = '<div class="machine-grid">';
    
    machineCards.forEach(card => {
        const cardClass = card.className;
        let estado = '';
        
        // Determinar el estado de la máquina según su clase
        if (cardClass.includes('machine-card-cerrada')) estado = 'cerrada';
        else if (cardClass.includes('machine-card-produccion')) estado = 'produccion';
        else if (cardClass.includes('machine-card-preparacion')) estado = 'preparacion';
        else if (cardClass.includes('machine-card-ajustesproduccion')) estado = 'ajustesproduccion';
        else if (cardClass.includes('machine-card-mantenimiento')) estado = 'mantenimiento';
        else if (cardClass.includes('machine-card-prototipoajuste')) estado = 'prototipoajuste';
        else if (cardClass.includes('machine-card-prototipoproduccion')) estado = 'prototipoproduccion';
        else if (cardClass.includes('machine-card-mejora')) estado = 'mejora';
        else if (cardClass.includes('machine-card-pausa')) estado = 'pausa';
        else if (cardClass.includes('machine-card-sinoperario')) estado = 'sinoperario';
        
        // Aplicar filtro de estado
        if (filters.estados[estado]) {
            filteredHtml += card.outerHTML;
        }
    });
    
    filteredHtml += '</div>';
    return filteredHtml;
}

function sortMachines(html, filters) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const machineCards = Array.from(doc.querySelectorAll('.machine-card'));
    
    // Ordenar las máquinas según el criterio seleccionado
    machineCards.sort((a, b) => {
        switch(filters.orden) {
            case 'tiempo_restante':
                return getRemainingTimeValue(a) - getRemainingTimeValue(b);
            
            case 'completado':
                return getCompletionValue(b) - getCompletionValue(a);
            
            case 'oee_turno':
                return getOeeTurnoValue(b) - getOeeTurnoValue(a);
            
            case 'oee_of':
                return getOeeOfValue(b) - getOeeOfValue(a);
            
            case 'maquina':
                return getMachineName(a).localeCompare(getMachineName(b));
            
            case 'finestimado':
                return getRemainingETA(a) - getRemainingETA(b);
            
            default:
                return 0;
        }
    });
    
    // Reconstruir el HTML ordenado
    let sortedHtml = '<div class="machine-grid">';
    machineCards.forEach(card => {
        sortedHtml += card.outerHTML;
    });
    sortedHtml += '</div>';
    
    return sortedHtml;
}

// Funciones auxiliares para obtener valores de las tarjetas
function getRemainingTimeValue(card) {
    const timeElement = Array.from(card.querySelectorAll('.machine-detail')).find(el => 
        el.querySelector('.detail-label') && 
        el.querySelector('.detail-label').textContent.includes('Tiempo restante')
    );
    
    if (!timeElement) return Infinity;
    
    const timeText = timeElement.querySelector('span:not(.detail-label)').textContent;
    if (timeText === 'N/A') return Infinity;
    return parseFloat(timeText) || 0;
}

function getRemainingETA(card) {
    const dateElement = Array.from(card.querySelectorAll('.machine-detail')).find(el => 
        el.querySelector('.detail-label') && 
        el.querySelector('.detail-label').textContent.includes('Fecha fin estimada')
    );
    
    if (!dateElement) return Infinity;
    
    const dateText = dateElement.querySelector('span:not(.detail-label)').textContent;
    if (dateText === 'N/A' || !dateText) return Infinity;
    
    // Convertir la fecha a timestamp (milisegundos)
    const date = new Date(dateText);
    return date.getTime() || Infinity;
}

function getCompletionValue(card) {
    const progressText = card.querySelector('.progress-text').textContent;
    return parseFloat(progressText) || 0;
}

function getOeeTurnoValue(card) {
    const oeeElement = card.querySelector('.oee-container');
    if (!oeeElement) return 0;
    
    const oeeText = oeeElement.querySelector('.oee-value').textContent;
    const turnoMatch = oeeText.match(/Tur:\s*([\d.]+)/);
    return turnoMatch ? parseFloat(turnoMatch[1]) : 0;
}

function getOeeOfValue(card) {
    const oeeElement = card.querySelector('.oee-container');
    if (!oeeElement) return 0;
    
    const oeeText = oeeElement.querySelector('.oee-value').textContent;
    const ofMatch = oeeText.match(/OF:\s*([\d.]+)/);
    return ofMatch ? parseFloat(ofMatch[1]) : 0;
}

function getMachineName(card) {
    return card.querySelector('.machine-name').textContent;
}