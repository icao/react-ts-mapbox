export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    // Llama a l API de geolocalización del navegador
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        //Manndamos en el resolve las coordenadas
        resolve([coords.longitude, coords.latitude])
      },
      (error) => {
        // Si no se cumple la promesa, lanzamos el reject
        alert(
          'No se pudo obtener la localización, permita su localización e intente de nuevo'
        )
        console.log(error)
        reject()
      }
    )
  })
}
