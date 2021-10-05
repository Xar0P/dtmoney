import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface Transaction {
	id: number;
	title: string;
	amount: number;
	type: string;
	category: string;
	createdAt: string;
}

interface Response {
	data: {
		transactions: [Transaction]
	},
}

interface TransactionsProviderProps {
	children: ReactNode; // Falando que ele pode receber qualquer elemento que o react entenda
}

export const TransactionsContext = createContext<Transaction[]>([]);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		api.get('transactions')
			.then((response: Response) => {
				setTransactions(response.data.transactions)
			});
	}, []);

	return (
		<TransactionsContext.Provider value={transactions}>
			{children}
		</TransactionsContext.Provider>
	);
}