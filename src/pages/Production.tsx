import { columns, DataRow } from '../logs/columns';
import { DataTable } from '../logs/dataTable';
import  { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data=  [
  {
    moduleName: "Module 1",
    section: "Production Module",
    timestamp: "2024-09-18T12:34:56Z",
    status: "pending",
  },
  {
    moduleName: "Module B",
    section: "Section 2",
    timestamp: "2024-09-19T09:20:30Z",
    status: "success",
  },
  // Add more data as needed
]

const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
    }
  });
  const data = await response.json();
  return data.hits.hits;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
};

const formatTooltipDate = (date: string) => {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
};

// Función para formatear los valores del eje Y con máximo 3 decimales
const formatYAxisTick = (value: number) => value.toFixed(3);

function App() {
  const [envData, setenvData] = useState<any[]>([]);
  const [intData, setintData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const rawEnvData = await fetchData(import.meta.env.VITE_TYH);
      const rawIntData = await fetchData(import.meta.env.VITE_INT_AMB);

      setenvData(rawEnvData);
      setintData(rawIntData);
      console.log(rawEnvData);
      console.log(rawIntData);
    };

    loadData();
  }, []);

  // Función para encontrar el rango adaptable para el eje Y
  const findYAxisRange = (data: any[], dataKey: string) => {
    const values = data.map(item => item._source[dataKey]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return [min - 1, max + 1]; // Añadir un pequeño margen
  };

  const containerSize = 320 ;

 
  return (
    <div className="w-full p-4">
  
      {/* Sección para los gráficos con grid layout */}
      <div className="flex flex-row flex-wrap gap-[1%]">
      <div className="w-full lg:w-[49%] mb-6 box-border p-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-4">Temperature PM</h3>
          <div className="relative">
          <ResponsiveContainer width="100%" height={containerSize}>
              <AreaChart
                data={envData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorTemperatura1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTemperatura2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="[_source][timestamp]"
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatDate}
                />
                <YAxis
                  domain={findYAxisRange(envData, 'Temperatura1')}
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatYAxisTick} // Aplicamos la función aquí
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: '#333' }}
                  itemStyle={{ color: '#8884d8' }}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="[_source][Temperatura1]"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="url(#colorTemperatura1)"
                  name="Temperatura 1"
                />
                <Area
                  type="monotone"
                  dataKey="[_source][Temperatura2]"
                  stroke="#82ca9d"
                  fillOpacity={0.3}
                  fill="url(#colorTemperatura2)"
                  name="Temperatura 2"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-[49%]  mb-6 p-4 box-border bg-white rounded-lg shadow-md">
          <h3 className="mb-4 ">Humidity PM</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={containerSize}>
              <AreaChart
                data={envData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorHumedad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHumedad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="[_source][timestamp]"
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatDate}
                />
                <YAxis
                  domain={findYAxisRange(envData, 'Humedad1')}
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatYAxisTick}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: '#333' }}
                  itemStyle={{ color: '#8884d8' }}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="[_source][Humedad1]"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="url(#colorHumedad1)"
                  name="Humedad 1" // Nombre personalizado para la leyenda
                />
                <Area
                  type="monotone"
                  dataKey="[_source][Humedad2]"
                  stroke="#82ca9d"
                  fillOpacity={0.3}
                  fill="url(#colorHumedad2)"
                  name="Humedad 2" // Nombre personalizado para la leyenda
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full p-4 lg:w-[32.5%] bg-white rounded-lg shadow-md">
          <h3 className="mb-4 ">Temperature IM </h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={containerSize}>
              <AreaChart
                data={intData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorTemperaturaH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#59f" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF7300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="[_source][timestamp]"
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatDate}
                />
                <YAxis
                  domain={findYAxisRange(intData, 'TemperaturaH')}
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatYAxisTick}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: '#333' }}
                  itemStyle={{ color: '#59f' }}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="[_source][TemperaturaH]"
                  stroke="#59f"
                  fillOpacity={0.3}
                  fill="url(#colorTemperaturaH)"
                  name="Temperatura H"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-[32.5%] p-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 ">Humidity IM</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={containerSize}>
              <AreaChart
                data={intData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorHumedadH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#51E938" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="[_source][timestamp]"
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatDate}
                />
                <YAxis
                  domain={findYAxisRange(intData, 'HumedadH')}
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatYAxisTick}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: '#333' }}
                  itemStyle={{ color: '#00C49F' }}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="[_source][HumedadH]"
                  stroke="#51E938"
                  fillOpacity={0.3}
                  fill="url(#colorHumedadH)"
                  name="Humedad H"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="w-full lg:w-[32.5%] p-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 ">CO2 IM</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={containerSize}>
              <AreaChart
                data={intData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorAmbiente" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7333" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                />
                <YAxis
                  domain={findYAxisRange(intData, 'CO2')}
                  axisLine={{ stroke: '#ddd' }}
                  tickLine={{ stroke: '#ddd' }}
                  tick={{ fill: '#999', fontSize: 12 }}
                  tickFormatter={formatYAxisTick} // Aplicamos la función aquí también
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: '#333' }}
                  itemStyle={{ color: '#ff7333' }}
                />
                <Area
                  type="monotone"
                  dataKey="[_source][CO2]"
                  stroke="#ff7333"
                  fillOpacity={0.3}
                  fill="url(#colorAmbiente)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
