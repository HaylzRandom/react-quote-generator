import React, { useEffect, useState } from 'react';

// Icons
import { FaQuoteLeft, FaTwitterSquare, FaTumblrSquare } from 'react-icons/fa';

const API_URL =
	'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const colours = [
	'#16a085',
	'#27ae60',
	'#2c3e50',
	'#f39c12',
	'#e74c3c',
	'#9b59b6',
	'#FB6964',
	'#342224',
	'#472E32',
	'#BDBB99',
	'#77B1A9',
	'#73A857',
];

const QuoteBox = () => {
	const [quote, setQuote] = useState('');
	const [author, setAuthor] = useState('');

	useEffect(() => {
		fetchQuotes();
		randomColour();
	}, []);

	const fetchQuotes = async () => {
		await fetch(API_URL)
			.then((res) => res.json())
			.then((data) => {
				let quotesData = data.quotes;

				let randomNumber = Math.floor(Math.random() * quotesData.length);

				let randomQuote = quotesData[randomNumber];

				setQuote(randomQuote.quote);
				setAuthor(randomQuote.author);
			});
	};

	const randomColour = () => {
		let randomColourNum = Math.floor(Math.random() * colours.length);

		let randomColour = colours[randomColourNum];

		document.documentElement.style.setProperty('--rdm-clr', randomColour);
	};

	const handleClick = () => {
		fetchQuotes();
		randomColour();
	};

	return (
		<div id='quote-box' className='quote-box'>
			<div className='quote-box__quotation'>
				<i class='fa-solid fa-quote-left'></i>

				<div id='text' className='quote-box__text'>
					{quote}
				</div>
			</div>

			<div id='author' className='quote-box__author'>
				- {author}
			</div>
			<div className='quote-box__links'>
				<a
					href={`https://twitter.com/intent/tweet?text=${quote}-${author}&hashtags=quote`}
					target='_blank'
					id='tweet-quote'
					className='quote-box__links--tweet'
				>
					<i class='fa-brands fa-twitter'></i>
				</a>
				<a
					href='https://www.tumblr.com'
					target='_blank'
					id='tumblr-quote'
					className='quote-box__links--tumblr'
				>
					<i class='fa-brands fa-tumblr'></i>
				</a>
			</div>

			<button
				id='new-quote'
				className='quote-box__new-quote'
				onClick={handleClick}
			>
				New Quote
			</button>
		</div>
	);
};

export default QuoteBox;
