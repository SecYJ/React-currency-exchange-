"use strict";

const currencyRates = [
	{
		name: "日幣",
		rate: 4.44,
		id: Math.random(),
	},
	{
		name: "美金",
		rate: 0.033,
		id: Math.random(),
	},
	{
		name: "韓幣",
		rate: 43.7,
		id: Math.random(),
	},
];

const App = () => {
	const { useState } = React;
	const [rates, setRates] = useState(currencyRates);
	const [exchangeInput, setExchangeInput] = useState(0);
	const [currency, setCurrency] = useState({
		name: "",
		rate: "",
	});
	const [currencyMemo, setCurrencyMemo] = useState(0);
	const [walletBalance, setWalletBalance] = useState(5000);
	const [history, setHistory] = useState([]);

	const checkAmount = (value) => (value ? value.toFixed(2) : 0);

	/*NOTE: Calculate currency of each countries based on user input*/
	const calculateExchangeCurrency = () => {
		setCurrencyMemo(exchangeInput);
		if (exchangeInput <= 0) return;
		setRates((prev) => {
			const newRates = prev.map((item) => {
				const amount = checkAmount(exchangeInput * item.rate);
				return { ...item, amount, userExchangeInput: exchangeInput };
			});
			return newRates;
		});
		setExchangeInput(0);
	};

	// NOTE: Add new currency when user click on submit button
	const addNewCurrency = () => {
		setRates((prevRates) => {
			const amount = checkAmount(currency.rate * currencyMemo);
			const currencyData = {
				...currency,
				amount,
				id: Math.random(),
				userExchangeInput: currencyMemo || 0,
			};
			return [currencyData, ...prevRates];
		});
		setCurrency({ name: "", rate: "" });
	};

	const updateCurrency = (e) => {
		const targetName = e.target.name;
		setCurrency((prevCurrency) => ({ ...prevCurrency, [targetName]: e.target.value }));
	};

	const exchange = (exchangeData) => {
		const balance = walletBalance - exchangeData.userExchangeInput;
		if (balance < 0) {
			alert("超出钱包金额");
			return;
		}
		setWalletBalance(balance);
		setHistory((prevHistory) => [exchangeData, ...prevHistory]);
	};

	return (
		<>
			<h3>新增幣種</h3>
			<input type="text" name="name" placeholder="幣種名稱" value={currency.name} onChange={updateCurrency} />
			<input type="text" name="rate" placeholder="匯率" value={currency.rate} onChange={updateCurrency} />
			<input
				type="button"
				value="新增幣種"
				onClick={addNewCurrency}
				disabled={!currency.rate || !currency.name}
			/>

			<hr />

			<h3>您錢包還有 {walletBalance} 元</h3>
			<p>請輸入您要換的台幣</p>

			<input
				type="text"
				placeholder="台幣"
				value={exchangeInput}
				onChange={(e) => setExchangeInput(e.target.value)}
			/>
			<input type="button" value="計算" onClick={calculateExchangeCurrency} />
			<p>可以換算</p>
			<ul>
				{rates.map((item) => {
					const { name, amount, id } = item;
					return (
						<li key={id}>
							{`${name}: ${amount || 0} 元`}
							<button type="button" onClick={() => exchange(item)} disabled={amount > 0 ? false : true}>
								兌換
							</button>
						</li>
					);
				})}
			</ul>

			<hr />
			<h3>您的兌換記錄</h3>
			<ul>
				{history.length > 0
					? history.map((item, index) => {
							const { amount, name, userExchangeInput } = item;
							return (
								<li key={index}>
									您用{userExchangeInput}元台幣, 兌換了{amount}
									{name}
								</li>
							);
					  })
					: "目前没有任何记录."}
			</ul>
		</>
	);
};

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));
