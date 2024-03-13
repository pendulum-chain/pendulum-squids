# In case we have access to the OHLCV data of two crypto/fiat pairs,
# we can use this script to form the OHLCV data of the fiat pair we need

## ASSUMPTION: The OHLCV data of the two pairs has the same length and the same timestamps,
## which may not be the case. 

import pandas as pd

# Load the OHLCV data of the pair with the desired fiat currency
csv_file_path_1 = 'ohlcv/ETHEUR_1.csv'
# Load the OHLCV data of the pair with usd as base currency
csv_file_path_2 = 'ohlcv/ETHUSD_1.csv'

result_csv_file_path = 'EURUSD.csv'

df1 = pd.read_csv(csv_file_path_1, header=None)
df2 = pd.read_csv(csv_file_path_2, header=None)

result_df = df1.iloc[:, [0]]

divided_columns = df2.iloc[:, 1:] / df1.iloc[:, 1:]

result_df = pd.concat([result_df, divided_columns], axis=1)

result_df.to_csv(result_csv_file_path, header=False, index=False)