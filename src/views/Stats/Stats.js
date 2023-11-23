import ReactEcharts from "echarts-for-react";
export default function Stats() {

    const option1 = {
        xAxis: {
            type: 'category',
            data: ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };

    const option3 = {
        xAxis: {
            type: 'category',
            data: ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [10, 1, 15, 11, 9, 11, 1],
                type: 'bar'
            }
        ]
    };

    const option2 = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Dodanych zadań', 'Rozwiązanych zadań']
        },
        series: [
            {
                name: '09.2023',
                type: 'bar',
                data: [2, 9]
            },
            {
                name: '10.2023',
                type: 'bar',
                data: [4, 2]
            }
        ]
    };

    return (
        <section className={'pb-5'} style={{height: '100%'}}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card">
                            <div className="card-body p-5">
                                <h2>Porównanie miesiąc do miesiąca</h2> <br/>
                                <ReactEcharts option={option2} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center h-100 mt-4">
                    <div className="col col-xl-10">
                        <div className="card">
                            <div className="card-body p-5">
                                <h2>Zamkniętych zadań w tym tygodniu</h2> <br/>
                                <ReactEcharts option={option1} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center h-100 mt-4">
                    <div className="col col-xl-10">
                        <div className="card">
                            <div className="card-body p-5">
                                <h2>Dodanych zadań w tym tygodniu</h2> <br/>
                                <ReactEcharts option={option3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
