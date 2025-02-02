import { getFilteredTransactions, getSortedTransactions } from "..";
interface Transaction {

  id: string;

  amount: number;

  status: string;

  date: string;

}


describe('getFilteredTransactions', () => {
  const transactions: Transaction[] = [
    { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
    { id: '2', amount: 200, status: 'pending', date: '2023-01-02' },
    { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
  ];

  it('should return all transactions when filterStatus is "all"', () => {
    // @ts-ignore
    const result = getFilteredTransactions(transactions, 'all');
    expect(result).toEqual(transactions);
  });

  it('should return only completed transactions when filterStatus is "completed"', () => {
    // @ts-ignore
    const result = getFilteredTransactions(transactions, 'completed');
    expect(result).toEqual([
      { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
      { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
    ]);
  });

  it('should return an empty array when transactions is null', () => {
    // @ts-ignore
    const result = getFilteredTransactions(null, 'completed');
    expect(result).toEqual([]);
  });
});

describe('getSortedTransactions', () => {
  const transactions: Transaction[] = [
    { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
    { id: '2', amount: 200, status: 'pending', date: '2023-01-02' },
    { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
  ];

  it('should sort transactions from High to Low', () => {
    // @ts-ignore
    const result = getSortedTransactions(transactions, 'High to Low');
    expect(result).toEqual([
      { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
      { id: '2', amount: 200, status: 'pending', date: '2023-01-02' },
      { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
    ]);
  });

  it('should sort transactions from Low to High', () => {
    // @ts-ignore
    const result = getSortedTransactions(transactions, 'Low to High');
    expect(result).toEqual([
      { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
      { id: '2', amount: 200, status: 'pending', date: '2023-01-02' },
      { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
    ]);
  });

  it('should sort transactions from Newest to Oldest', () => {
    // @ts-ignore
    const result = getSortedTransactions(transactions, 'Newest');
    expect(result).toEqual([
      { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
      { id: '2', amount: 200, status: 'pending', date: '2023-01-02' },
      { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
    ]);
  });

  it('should sort transactions from Oldest to Newest', () => {
    // @ts-ignore
    const result = getSortedTransactions(transactions, 'Oldest');
    expect(result).toEqual([
      { id: '1', amount: 100, status: 'completed', date: '2023-01-01' },
      { id: '2', amount: 200, status: 'pending', date: '2023-01-02' },
      { id: '3', amount: 300, status: 'completed', date: '2023-01-03' },
    ]);
  });

  it('should return an empty array when transactions is null', () => {
    // @ts-ignore
    const result = getSortedTransactions(null, 'Newest');
    expect(result).toEqual([]);
  });
});