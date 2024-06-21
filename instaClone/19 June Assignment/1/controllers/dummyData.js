const men = (req,res,next) =>{
    res.status(200).json([
        {
            "id":"1",
            "name":"Shirt",
            "brand":"Sparky",
            "price":"500",
            "size":"L",
        },
        {
            "id":"2",
            "name":"Jeans",
            "brand":"Denim",
            "price":"900",
            "size":"L",
        },
        {
            "id":"3",
            "name":"T-Shirt",
            "brand":"Sparky",
            "price":"400",
            "size":"L",
        },
        {
            "id":"4",
            "name":"T-Shirt",
            "brand":"Sparky",
            "price":"800",
            "size":"M",
        },
        {
            "id":"5",
            "name":"Jacket",
            "brand":"Roadster",
            "price":"1200",
            "size":"L",
        },
        {
            "id":"6",
            "name":"Lower",
            "brand":"Denim",
            "price":"500",
            "size":"L",
        },
        {
            "id":"7",
            "name":"Shirt",
            "brand":"Denim",
            "price":"900",
            "size":"L",
        },
        {
            "id":"8",
            "name":"Shoe",
            "brand":"woodland",
            "price":"1100",
            "size":"10",
        },
        {
            "id":"9",
            "name":"Watch",
            "brand":"Timex",
            "price":"500",
        },
        {
            "id":"10",
            "name":"Belt",
            "brand":"Woodland",
            "price":"500",
            "size":"L",
        },
    ]
    )
};

const women = (req,res,next) =>{
    res.status(200).json(
        [
            {
                "id": "11",
                "name": "Skirt",
                "brand": "H&M",
                "price": "800",
                "size": "L"
            },
            {
                "id": "12",
                "name": "Dress",
                "brand": "Forever 21",
                "price": "1500",
                "size": "S"
            },
            {
                "id": "13",
                "name": "Handbag",
                "brand": "Michael Kors",
                "price": "2500"
            },
            {
                "id": "14",
                "name": "Heels",
                "brand": "Steve Madden",
                "price": "1800",
                "size": "7"
            },
            {
                "id": "15",
                "name": "Scarf",
                "brand": "Burberry",
                "price": "1200"
            },
            {
                "id": "16",
                "name": "Jacket",
                "brand": "North Face",
                "price": "3000",
                "size": "M"
            },
            {
                "id": "17",
                "name": "Necklace",
                "brand": "Swarovski",
                "price": "1000"
            },
            {
                "id": "18",
                "name": "Jeans",
                "brand": "Levi's",
                "price": "1200",
                "size": "28"
            },
            {
                "id": "19",
                "name": "Sunglasses",
                "brand": "Ray-Ban",
                "price": "1500"
            },
            {
                "id": "20",
                "name": "Sweater",
                "brand": "GAP",
                "price": "900",
                "size": "M"
            }
        ]
        
    )
};

const other = (req,res,next) =>{
    res.status(404).send('Page Not Found!')
};

export {
    men,
    women,
    other
}