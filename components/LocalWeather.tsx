import React, { useState, useEffect } from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { fetchWeatherApi } from 'openmeteo';

async function currentTemperature(): Promise<number> {
    const params = {
        "latitude": 30.5083,
        "longitude": -97.6789,
        "current": "apparent_temperature",
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch"
    };
    const forecastUrl = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(forecastUrl, params);

    return responses[0].current()!.variables(0)!.value();
}
  
export function LocalWeather() {
    const [data, setData] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
        try {
            const response = await currentTemperature()
            setData(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    useEffect(() => {
        fetchData();
    }, []);
    
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
      <Text>Current Temperature: {data.toLocaleString('en-us', {maximumFractionDigits:1, minimumFractionDigits:1})}&deg;</Text>
    );
  }
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 28,
      lineHeight: 32,
      marginTop: -6,
    },
  });