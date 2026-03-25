import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { Link } from 'react-router-dom';
import "./App.css";

const plantData = [
  {
    category: "Air Purifying",
    plants: [
      {
        name: "Snake Plant",
        image: "https://images.unsplash.com/photo-1599591459518-e3c329d5b78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Produces oxygen at night, improving air quality.",
        cost: "$15"
      },
      {
        name: "Spider Plant",
        image: "https://images.unsplash.com/photo-1572688066342-94475459333a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Filters formaldehyde and xylene from the air.",
        cost: "$12"
      },
      {
        name: "Peace Lily",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Removes mold spores and purifies common toxins.",
        cost: "$18"
      },
      {
        name: "Boston Fern",
        image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Adds humidity to the air and removes toxins.",
        cost: "$20"
      },
      {
        name: "Rubber Plant",
        image: "https://images.unsplash.com/photo-1525498122316-3e2ead2463e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Easy to care for and very effective at removing toxins.",
        cost: "$17"
      },
      {
        name: "Aloe Vera",
        image: "https://images.unsplash.com/photo-1567331711402-509bf2b9633e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
        image: "https://images.unsplash.com/photo-1570146816573-049ba382f768?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
        image: "https://images.unsplash.com/photo-1603436735517-575510427357?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
        image: "https://images.unsplash.com/photo-1594917452449-d779f338d781?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Unique succulent with pea-like leaves, very low maintenance.",
        cost: "$18"
      }
    ]
  }
];

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const isAddedToCart = (productName) => {
        return cartItems.some(item => item.name === productName);
    };

    return (
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
    );
}

export default ProductList;