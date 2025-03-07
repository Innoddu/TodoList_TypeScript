import React, { useState, useEffect } from 'react';
import '../style/ItemPageLoggedOutView.css';

const ItemPageLoggedOutView = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "W elcome to TodoList App !";

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + fullText.charAt(currentIndex));
            currentIndex = currentIndex + 1;
            if (currentIndex === fullText.length) {
                clearInterval(intervalId);
            }
        }, 100); // Adjust the interval duration (in milliseconds) as needed

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [fullText]);

    return (
        <div className="white-space">
            <h2>
                {displayedText}
            </h2>
        </div>
    );
}

export default ItemPageLoggedOutView;