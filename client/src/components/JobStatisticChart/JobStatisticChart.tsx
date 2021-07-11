import {
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import {ReactChart} from 'chartjs-react';
import React, {useCallback, useEffect, useState} from 'react';
import {upperCaseWord} from '../../util/upperCaseWord';
import {JobStatisticsModel} from '../JobStatistics/models/JobStatisticsModel';
import {SearchSettingModel} from '../JobStatistics/models/searchSettingModel';

ReactChart.register(
  zoomPlugin,
  TimeScale,
  Title,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

interface JobStatisticChartProps {
  jobStatisticData: JobStatisticsModel;
  searchSettingsData: SearchSettingModel[];
}

const JobStatisticChart: React.FC<JobStatisticChartProps> = ({
  jobStatisticData,
  searchSettingsData,
}) => {
  const [chartData, setChartData] = useState<any>();

  const initChartConfig = useCallback(() => {
    const dataSets: any[] = [];
    const queries: string[] = jobStatisticData.query.searchValues;
    jobStatisticData.query.searchValues.forEach((value) => {
      const chartConfig = searchSettingsData.find(
        (setting) => setting.query === value
      )?.chartConfig;
      dataSets.push({
        label: value,
        data: [],
        backgroundColor: chartConfig?.backgroundColor || '',
        borderColor: chartConfig?.borderColor || '',
        borderWidth: 1,
      });
    });

    let indexOfConfig: number;
    jobStatisticData.statistics.forEach((queryArray) => {
      if (!queryArray.length) return;
      const dataArray: number[] = Array(12).fill([0]);
      queryArray.forEach((item) => {
        const monthIndex = +item.jobDateAsYearMonth.split('-')[1];
        indexOfConfig = queries.findIndex((value) => value === item.query);
        dataArray[monthIndex - 1] = item.count;
      });
      dataSets[indexOfConfig].data = dataArray;
    });

    setChartData({
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: dataSets,
    });
  }, [jobStatisticData, searchSettingsData, setChartData]);

  useEffect(() => {
    initChartConfig();
  }, [initChartConfig]);

  return (
    <div
      style={{
        position: 'relative',
        height: '600px',
        width: '100%',
      }}
    >
      <ReactChart
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Jobs per month statistics for ${
                jobStatisticData.query.year
              } in area (${upperCaseWord(jobStatisticData.query.location)})`,
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
            },
          },
        }}
        type="bar"
      />
    </div>
  );
};

export default JobStatisticChart;
