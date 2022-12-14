import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import {
  paletteOne,
  paletteTwo,
  paletteThree,
  paletteFour,
  paletteFive,
} from '../src/helpers/palette';

enablePromise(true);

const monthYear = new Date().toLocaleDateString(undefined, {
  year: 'numeric',
  month: '2-digit',
});

export const getDBConnection = async () => {
  return openDatabase({name: 'finance-data.db', location: 'default'});
};

// funds
// export const createFundsTable = async db => {
//   const query = 'CREATE TABLE IF NOT EXISTS funds (name TEXT, fundType TEXT)';
//   await db.executeSql(query);
// };

// export const createFund = async (db, fund) => {
//   const {name, fundType} = fund;
//   const insertQuery = `INSERT INTO funds(name, fundType) VALUES("${name}", "${fundType}")`;
//   return db.executeSql(insertQuery);
// };

// categories
// export const createCategoriesTable = async db => {
//   const query = 'CREATE TABLE IF NOT EXISTS categories (categoryType TEXT)';
//   await db.executeSql(query);
// };

// export const createCategory = async (db, fund) => {
//   // const {name, categoryType} = fund;
//   const {categoryType} = fund;
//   const insertQuery = `INSERT INTO categories(categoryType) VALUES("${categoryType}")`;

//   return db.executeSql(insertQuery);
// };

// export const getCategories = async db => {
//   try {
//     const categories = [];
//     const results = await db.executeSql(
//       'SELECT rowid as id, categoryType FROM categories',
//     );
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         categories.push(result.rows.item(index));
//       }
//     });
//     return categories;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get getCategories...');
//   }
// };

// transactions
export const createTransactionsTable = async db => {
  const query =
    'CREATE TABLE IF NOT EXISTS transactions (id INTEGER NOT NULL PRIMARY KEY, transactionDate INTEGER, summary TEXT, transactionType TEXT, amount FLOAT)';
  await db.executeSql(query);
};

export const createTransaction = async (db, transaction) => {
  const {transactionDate, summary, transactionType, amount} = transaction;
  const timestamp = parseInt((transactionDate.getTime() / 1000).toFixed(0), 10);
  const insertQuery = `INSERT INTO transactions(transactionDate, summary, transactionType, amount) VALUES("${timestamp}", "${summary}", "${transactionType}", "${amount}")`;
  return db.executeSql(insertQuery);
};

export const getTransactionsGroupedByTransactionType = async db => {
  try {
    const transactions = [];
    const results = await db.executeSql(
      `SELECT SUM(amount) AS total, transactionType AS name FROM transactions 
			WHERE strftime("%m/%Y", datetime(transactionDate, 'unixepoch', 'localtime')) = ?
			GROUP BY transactionType`,
      [monthYear],
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const {name, total} = result.rows.item(index);
        transactions.push({
          name,
          total,
          color: paletteOne[index],
        });
      }
    });
    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to getTransactionsGroupedByTransactionType...');
  }
};

// export const getExpenseTransactionsGroupedByCategory = async db => {
//   try {
//     const transactions = [];
//     const results = await db.executeSql(
//       `SELECT SUM(amount) AS total, categories.name AS name FROM transactions
// 			INNER JOIN categories ON categories.rowId = transactions.category_id
// 			WHERE categoryType = 'expense' AND strftime("%m/%Y", datetime(transactionDate, 'unixepoch', 'localtime')) = ?
// 			GROUP BY transactions.category_id`,
//       [monthYear],
//     );
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         const {name, total} = result.rows.item(index);
//         transactions.push({
//           name,
//           total,
//           color: paletteTwo[index],
//         });
//       }
//     });
//     return transactions;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to getExpenseTransactionsGroupedByCategory...');
//   }
// };

// export const getIncomeTransactionsGroupedByCategory = async db => {
//   try {
//     const transactions = [];
//     const results = await db.executeSql(
//       `SELECT SUM(amount) AS total, categories.name AS name FROM transactions
// 			INNER JOIN categories ON categories.rowId = transactions.category_id
// 			WHERE categoryType = 'income' AND transactions.transactionType = 'income'
// 			AND strftime("%m/%Y", datetime(transactionDate, 'unixepoch', 'localtime')) = ?
// 			GROUP BY transactions.category_id`,
//       [monthYear],
//     );
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         const {name, total} = result.rows.item(index);
//         transactions.push({
//           name,
//           total,
//           color: paletteThree[index],
//         });
//       }
//     });
//     return transactions;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to getIncomeTransactionsGroupedByCategory...');
//   }
// };

// export const getSavingsTransactionsGroupedByCategory = async db => {
//   try {
//     const transactions = [];
//     const results = await db.executeSql(
//       `SELECT SUM(amount) AS total, categories.name AS name FROM transactions
// 			INNER JOIN categories ON categories.rowId = transactions.category_id
// 			WHERE categoryType = 'income' AND transactions.transactionType = 'savings'
// 			AND strftime("%m/%Y", datetime(transactionDate, 'unixepoch', 'localtime')) = ?
// 			GROUP BY transactions.category_id`,
//       [monthYear],
//     );
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         const {name, total} = result.rows.item(index);
//         transactions.push({
//           name,
//           total,
//           color: paletteFour[index],
//         });
//       }
//     });
//     return transactions;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to getSavingsTransactionsGroupedByCategory...');
//   }
// };

// export const getInvestmentTransactionsGroupedByCategory = async db => {
//   try {
//     const transactions = [];
//     const results = await db.executeSql(
//       `SELECT SUM(amount) AS total, categories.name AS name FROM transactions
// 			INNER JOIN categories ON categories.rowId = transactions.category_id
// 			WHERE categoryType = 'income' AND transactions.transactionType = 'investment'
// 			AND strftime("%m/%Y", datetime(transactionDate, 'unixepoch', 'localtime')) = ?
// 			GROUP BY transactions.category_id`,
//       [monthYear],
//     );
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         const {name, total} = result.rows.item(index);
//         transactions.push({
//           name,
//           total,
//           color: paletteFive[index],
//         });
//       }
//     });
//     return transactions;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to getInvestmentTransactionsGroupedByCategory...');
//   }
// };

export const getIncomeGroupedByMonth = async db => {
  try {
    const transactions = [];
    const results = await db.executeSql(
      `SELECT strftime("%m-%Y", datetime(transactionDate, 'unixepoch', 'localtime')) AS monthYear,
			SUM(amount) AS total 
			FROM transactions 
			WHERE transactionType = 'income'
			GROUP BY monthYear`,
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);

        transactions.push({
          name: 'Income',
          value: item.total,
          label: item.monthYear,
          color: paletteTwo[index],
          legendFontColor: '#fff',
          legendFontSize: 12,
        });
      }
    });

    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to getIncomeGroupedByMonth...');
  }
};

export const getSavingsGroupedByMonth = async db => {
  try {
    const transactions = [];
    const results = await db.executeSql(
      `SELECT strftime("%m-%Y", datetime(transactionDate, 'unixepoch', 'localtime')) AS monthYear,
			SUM(amount) AS total 
			FROM transactions 
			WHERE transactionType = 'savings'
			GROUP BY monthYear`,
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);

        transactions.push({
          name: 'Savings',
          value: item.total,
          label: item.monthYear,
          color: paletteThree[index],
          legendFontColor: '#fff',
          legendFontSize: 12,
        });
      }
    });

    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to getSavingsGroupedByMonth...');
  }
};

export const getInvestmentsGroupedByMonth = async db => {
  try {
    const transactions = [];
    const results = await db.executeSql(
      `SELECT strftime("%m-%Y", datetime(transactionDate, 'unixepoch', 'localtime')) AS monthYear,
			SUM(amount) AS total 
			FROM transactions 
			WHERE transactionType = 'investment'
			GROUP BY monthYear`,
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);

        transactions.push({
          name: 'Investment',
          value: item.total,
          label: item.monthYear,
          color: paletteFour[index],
          legendFontColor: '#fff',
          legendFontSize: 12,
        });
      }
    });

    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to getInvestmentsGroupedByMonth...');
  }
};

export const getExpenseGroupedByMonth = async db => {
  try {
    const transactions = [];
    const results = await db.executeSql(
      `SELECT strftime("%m-%Y", datetime(transactionDate, 'unixepoch', 'localtime')) AS monthYear,
			SUM(amount) AS total 
			FROM transactions 
			WHERE transactionType = 'expense'
			GROUP BY monthYear`,
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);

        transactions.push({
          name: 'Expense',
          value: item.total,
          label: item.monthYear,
          color: paletteFive[index],
          legendFontColor: '#fff', //paletteFive[index],
          legendFontSize: 12,
        });
      }
    });

    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to getExpenseGroupedByMonth...');
  }
};
