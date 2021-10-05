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

// herdar todos os campos do Transaction, menos id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// herda somente os campos especificados
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface Response {
	data: {
		transactions: [Transaction]
	},
}

interface TransactionsProviderProps {
	children: ReactNode; // Falando que ele pode receber qualquer elemento que o react entenda
}

interface TransactionsContextData {
	transactions: Transaction[];
	createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		api.get('transactions')
			.then((response: Response) => {
				setTransactions(response.data.transactions)
			});
	}, []);

	function createTransaction(transaction: TransactionInput) {
		api.post('/transactions', transaction);
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}