import { searchMouser } from '../service/mouserService.js';
import { searchRutronik } from '../service/rutronikService.js';

const priceForVolume = (priceBreaks, volume) => {
    for (let i = priceBreaks.length - 1; i >= 0; i--) {
        if (volume >= priceBreaks[i]?.Quantity) {
            return priceBreaks[i]?.Price;
        }
    }
    return priceBreaks[0].Price; // Return the lowest price if no match
};

export const searchController = async (req, res) => {
    const { partNumber, volume } = req.body;

    try {
        const [mouserData, rutronikData] = await Promise.all([
            searchMouser(partNumber),
            searchRutronik(partNumber),
        ]);

        const results = [];

        // Mouser Data
        if (mouserData && mouserData.SearchResults && mouserData.SearchResults.Parts) {
            mouserData.SearchResults?.Parts?.forEach(part => {
                const unitPrice = priceForVolume(part?.PriceBreaks, volume);
                results.push({
                    partNumber: part.ManufacturerPartNumber,
                    manufacturer: part.Manufacturer,
                    dataProvider: 'Mouser',
                    volume,
                    unitPrice: parseFloat(unitPrice.replace('₹', '').trim()),
                    totalPrice: parseFloat(unitPrice.replace('₹', '').trim()) * volume,
                });
            });
        }

        // Rutronik Data
        if (rutronikData && rutronikData?.length > 0) {
            rutronikData?.forEach(part => {
                const priceBreak = part.pricebreaks.find(pb => volume >= pb.quantity) || part.pricebreaks[0];
                const unitPrice = convertCurrency(priceBreak?.price, 'EUR', 'INR');
                results?.push({
                    partNumber: part.mpn,
                    manufacturer: part.manufacturer,
                    dataProvider: 'Rutronik',
                    volume,
                    unitPrice,
                    totalPrice: unitPrice * volume,
                });
            });
        }
        results.sort((a, b) => a.totalPrice - b.totalPrice);

        res.json(results);
    } catch (error) {
        console.error('Error processing search request:', error);
        res.status(500).json({ error: 'Error processing search request' });
    }
};
export const updateVolumeController = async (req, res) => {
const { partNumber, volume, dataProvider } = req.body;

    try {
        let unitPrice;
        if (dataProvider === 'Mouser') {
            const mouserData = await searchMouser(partNumber);
            if (mouserData && mouserData.SearchResults && mouserData.SearchResults.Parts) {
                const mouserPart = mouserData.SearchResults.Parts[0]; // Assume single result for simplicity
                unitPrice = priceForVolume(mouserPart.PriceBreaks, volume);
                return res.json({ unitPrice: parseFloat(unitPrice.replace('₹', '').trim()) });
            }
        } else if (dataProvider === 'Rutronik') {
            const rutronikData = await searchRutronik(partNumber);
            if (rutronikData && rutronikData.length > 0) {
                const rutronikPart = rutronikData[0]; // Assume single result for simplicity
                const priceBreak = rutronikPart.pricebreaks.find(pb => volume >= pb.quantity) || rutronikPart.pricebreaks[0];
                unitPrice = convertCurrency(priceBreak.price, 'EUR', 'INR');
                return res.json({ unitPrice });
            }
        }
        return res.status(404).json({ error: 'Part number or data provider not found' });
    } catch (error) {
        console.error('Error fetching price:', error);
        res.status(500).json({ error: 'Error fetching price' });
    }
};


const currencyRates = {
    USD: 84,
    EUR: 90,
};

const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
        return parseFloat(amount);
    }
    const rate = currencyRates[fromCurrency] || 1;
    return parseFloat(amount) * rate;
};

