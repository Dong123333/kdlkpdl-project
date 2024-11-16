import {useEffect, useState} from "react";
import Papa from "papaparse";
import Plot from 'react-plotly.js';

function Chart() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/usd_to_jpy_exchange_rate.csv')
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        if (result && result.data && result.data.length > 0) {
                            const timestamps = result.data.map(row => row["Timestamp"]);
                            const exchangeRates = result.data.map(row => parseFloat(row["Exchange Rate"]));

                            setChartData({
                                x: timestamps,
                                y: exchangeRates,
                                type: 'scatter',
                                mode: 'lines',
                                marker: {color: 'red'},
                            });
                        } else {
                            console.error("CSV không có dữ liệu hoặc phân tích lỗi.");
                            setChartData(null);
                        }
                        setLoading(false);
                    },
                });
            })
            .catch(error => {
                console.error("Không thể tải file CSV:", error);
                setLoading(false);
                setChartData(null);
            });
    }, []);
    return (
        <div>
            {loading ? (
                <p>Loading chart...</p>
            ) : chartData ? (
                <Plot
                    data={[chartData]}
                />
            ) : (
                <p>No data available to display.</p>
            )}
        </div>

    )
}

export default Chart;