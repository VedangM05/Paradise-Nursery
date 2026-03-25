import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import Navbar from './Navbar';
import CartItem from './CartItem';
import "./App.css";

const plantData = [
  {
    category: "Air Purifying",
    plants: [
      {
        name: "Snake Plant",
        image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
        description: "Produces oxygen at night, improving air quality.",
        cost: "$15"
      },
      {
        name: "Spider Plant",
        image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
        description: "Filters formaldehyde and xylene from the air.",
        cost: "$12"
      },
      {
        name: "Peace Lily",
        image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg",
        description: "Removes mold spores and purifies common toxins.",
        cost: "$18"
      },
      {
        name: "Boston Fern",
        image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
        description: "Adds humidity to the air and removes toxins.",
        cost: "$20"
      },
      {
        name: "Rubber Plant",
        image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
        description: "Easy to care for and very effective at removing toxins.",
        cost: "$17"
      },
      {
        name: "Aloe Vera",
        image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283151_1280.jpg",
        description: "Known for its medicinal properties and air-purifying qualities.",
        cost: "$14"
      }
    ]
  },
  {
    category: "Aromatic",
    plants: [
      {
        name: "Lavender",
        image: "https://images.unsplash.com/photo-1533228890825-697005321855?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Calming scent, used in aromatherapy.",
        cost: "$20"
      },
      {
        name: "Jasmine",
        image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Sweet fragrance, promotes relaxation.",
        cost: "$18"
      },
      {
        name: "Rosemary",
        image: "https://images.unsplash.com/photo-1591113061214-7f1301901231?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Invigorating scent, often used in cooking.",
        cost: "$15"
      },
      {
        name: "Mint",
        image: "https://images.unsplash.com/photo-1589123014748-0240d990bc70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Refreshing aroma, used in teas and cooking.",
        cost: "$12"
      },
      {
        name: "Lemon Balm",
        image: "https://images.unsplash.com/photo-1531641065287-347065094954?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Citrusy scent, known for its calming properties.",
        cost: "$14"
      },
      {
        name: "Hyacinth",
        image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Hyacinth is a small genus of bulbous, spring-blooming perennials.",
        cost: "$22"
      }
    ]
  },
  {
    category: "Low Maintenance",
    plants: [
      {
        name: "ZZ Plant",
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Thrives in low light and requires minimal watering.",
        cost: "$25"
      },
      {
        name: "Pothos",
        image: "https://images.unsplash.com/photo-1598438103328-98e945c11f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Tolerates neglect and can grow in various light conditions.",
        cost: "$10"
      },
      {
        name: "Cast Iron Plant",
        image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Hardy plant that survives low light and neglect.",
        cost: "$20"
      },
      {
        name: "Jade Plant",
        image: "https://images.unsplash.com/photo-1590492582876-06900ee4b5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Succulent with thick leaves, requires very little water.",
        cost: "$15"
      },
      {
        name: "Spider Plant",
        image: "https://images.unsplash.com/photo-1572688066342-94475459333a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Resilient and adaptable, perfect for beginners.",
        cost: "$12"
      },
      {
        name: "String of Pearls",
        image: "https://images.unsplash.com/photo-1582136034176-b5e02244957e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Unique succulent with pea-like leaves, very low maintenance.",
        cost: "$18"
      }
    ]
  }
];

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);
    
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const isAddedToCart = (productName) => {
        return cartItems.some(item => item.name === productName);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <Navbar onCartClick={handleCartClick} onPlantsClick={handlePlantsClick} />
            <div className="product-page-container">
                {!showCart ? (
                    <div className="product-page">
                        <h1 style={{ textAlign: 'center', marginTop: '30px', color: '#2e7d32' }}>Our Plant Collection</h1>
                        {plantData.map((category, index) => (
                            <div key={index}>
                                <h2 style={{ paddingLeft: '3rem', marginTop: '40px', color: '#333' }}>{category.category}</h2>
                                <div className="product-grid">
                                    {category.plants.map((plant, idx) => (
                                        <div key={idx} className="product-card">
                                            <img src={plant.image} alt={plant.name} className="product-image" />
                                            <h3 className="product-title">{plant.name}</h3>
                                            <div className="product-price">{plant.cost}</div>
                                            <p className="product-description">{plant.description}</p>
                                            <button 
                                                className={`add-to-cart-btn ${isAddedToCart(plant.name) ? 'added-btn' : ''}`}
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={isAddedToCart(plant.name)}
                                            >
                                                {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <CartItem onContinueShopping={() => setShowCart(false)} />
                )}
            </div>
        </div>
    );
}

export default ProductList;