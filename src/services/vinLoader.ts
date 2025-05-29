interface IInfoUnit {
    title: string;
    value: string;
}

interface IResponse {
    status: number;
    found: boolean;
    Year: IInfoUnit;
    typeCar: IInfoUnit;
    Displacement_nominal: IInfoUnit;
    Model: IInfoUnit;
    Make: IInfoUnit;
}

export default async function (vin: string): Promise {
    // const apiUrl = `https://api-cloud.ru/api/vindecoder.php?type=vin&vin=${vin}&token=53ba1b7a55abbB014aa97eff3a522079`;
    // try {
    //     const response = await fetch(apiUrl);

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     console.log(data);

    //     if (data && data.success) {
    //         return data.data;
    //     } else {
    //         throw new Error(data.message || 'Не удалось получить информацию по VIN');
    //     }
    // } catch (error) {
    //     console.error('Ошибка при запросе информации по VIN:', error.message);
    //     throw error;
    // }
    return {
        type: 'хэтчбек',
        volumeEngine: 1.3,
        model: '2108',
        brand: 'Лада',
        year: '2001',
    };
}
