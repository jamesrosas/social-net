const timeline = [
    {
        id: 1,
        name: "James Rosas",
        description: "Que genial que esta este proyecto, te reta en gran medida y tambien te enseña bastante",
        avatar: "https://i.postimg.cc/CLVk4R4t/supreme-galaxy.png"
    },
    {
        id: 2,
        name: "Gloria Queroz",
        description: "No ha sido un camino nada facil convertirme en desarrolladora de Sofware pero sin duda cada minuto ha valido la pena",
        avatar: "https://i.postimg.cc/2jtcyqvy/bubble.png"
    },
    {
        id: 3,
        name: "Oscar Stweart",
        description: "Con el desarrollo web puedes trabajar en cualquier sector que te imaginas, todo lleva programacion , y encima lo puedes hacer en remoto desde cualquier lugar del mundo",
        avatar: "https://i.postimg.cc/yxhJGTTG/tupac.png"
    },
    {
        id: 4,
        name: "Pipa Schwartz",
        description: "lo mejor de todo es ver hacia atras y notar cuanto has crecido en conimiento, y como con este has ayudado a varias personas a construir sus ideas",
        avatar: "https://i.postimg.cc/wBk4j0cY/rickandmorty.png"
    }
]

export default (req , res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    res.send(JSON.stringify(timeline))
}