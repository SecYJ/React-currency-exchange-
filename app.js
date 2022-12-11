"use strict";

const currencyRates = [
	{
		name: "日幣",
		rate: 1,
	},
	{
		name: "美金",
		rate: 2,
	},
	{
		name: "澳幣",
		rate: 3,
	},
	{
		name: "韓幣",
		rate: 4,
	},
	{
		name: "印尼幣",
		rate: 5,
	},
];

const App = () => {
	const { useState, useRef } = React;
	const [rates, setRates] = useState(currencyRates);
	const inputRef = useRef();
	const [inputRefMemo, setInputRefMemo] = useState("");
	const newCurrencyRateRef = useRef();
	const newCurrencyNameRef = useRef();

	/*
        NOTE: Calculate currency of each countries based on user input
    */
	const calculateExchangeCurrency = () => {
		setRates((prev) => {
			const newRate = prev.map((item) => {
				return { ...item, value: item.rate * parseInt(inputRef.current.value) };
			});
			return newRate;
		});
		setInputRefMemo(inputRef.current.value);
	};

	// NOTE: Add new currency when user click on submit button
	const addNewCurrency = () => {
		setRates((prev) => {
			const newCurrency = [...prev];
			const isValueExist = newCurrency.some((currency) => currency.value);
			const currencyData = {
				id: Math.random(),
				name: newCurrencyNameRef.current.value,
				rate: newCurrencyRateRef.current.value,
				value: isValueExist ? newCurrencyRateRef.current.value * inputRefMemo : null,
			};
			newCurrency.unshift(currencyData);
			return newCurrency;
		});
	};

	const isAddNewCurrencyDisabled = () => {
		// const isValid = (val) => val.trim() !== "";
		// return isValid(newCurrencyRateRef.current.value) && isValid(newCurrencyNameRef.current.value);
		return newCurrencyRateRef.current.value.trim() !== "" && newCurrencyNameRef.current.value.trim() !== "";
	};

	console.log("diu lei");

	return (
		<>
			<h3>新增幣種</h3>
			<input type="text" placeholder="幣種名稱" ref={newCurrencyNameRef} />
			<input type="text" placeholder="匯率" ref={newCurrencyRateRef} />
			<input type="button" value="新增幣種" onClick={addNewCurrency} />
			<hr />
			<input type="text" placeholder="台幣" ref={inputRef} />
			<input type="button" value="計算" onClick={calculateExchangeCurrency} />
			<p>可以換算</p>
			<ul>
				{rates.map((item, index) => {
					const { name, value } = item;
					return <li key={index}>{value ? `${name}: ${value}` : `${name}: `}</li>;
				})}
			</ul>
		</>
	);
};

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));
