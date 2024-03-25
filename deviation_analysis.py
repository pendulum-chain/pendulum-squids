# script to run to analyze the deviation data. Histograms, boxplots, and metrics are generated for each currency analyzed.
import pandas as pd
import matplotlib.pyplot as plt
import json

THRESHOLD=0.1

with open('dev_amplitude.json', 'r') as file:
    data = json.load(file)

dfs = {currency: pd.DataFrame(records['deviations']) for currency, records in data.items()}

for currency, records in data.items():
    # get the dataframe corresponding to the deviation
    df = dfs[currency]

    # Filter out rows where deviation is NaN (null values)
    df_cleaned = df.dropna(subset=['deviation'])
    rows_removed = df.shape[0] - df_cleaned.shape[0]
    
    # form a new dataframe accounting for the blocks with no deviation
    no_deviation_count = records['statistics']['no_deviation_count']
    zero_deviation_rows = pd.DataFrame([{'deviation': 0, 'timestamp': None} for _ in range(no_deviation_count)])
    all_records = pd.concat([df_cleaned, zero_deviation_rows], ignore_index=True)

    # Histogram
    plt.figure(figsize=(10, 6))
    df_cleaned['deviation'].plot(kind='hist', bins=100, title=f'Deviations Histogram for {currency}')
    plt.xlabel('Deviation (%)')
    plt.ylabel('Frequency')
    plt.show()

    # Box plot
    plt.figure(figsize=(10, 6))
    df_cleaned.boxplot(column=['deviation'])
    plt.title(f'Boxplot of Deviations for {currency}')
    plt.ylabel('Deviation (%)')
    plt.show()

    # Metrics
    count = df_cleaned['deviation'].count()
    all_records_count = all_records['deviation'].count()
    first_timestamp = df_cleaned['timestamp'].min()
    last_timestamp = df_cleaned['timestamp'].max()
    accuracy = ((all_records_count - count) / all_records_count) 
    mean_deviation = all_records['deviation'].mean()
    mean_of_deviation = df_cleaned['deviation'].mean()
    std_deviation_of_deviation = df_cleaned['deviation'].std()

    print(f"{currency} - Analysis from: {first_timestamp}")
    print(f"{currency} - Analysis to: {last_timestamp}")
    print(f"{currency} - Deviation events: {count}")
    print(f"{currency} - Total blocks: {all_records_count}")
    print(f"{currency} - Accuracy: {accuracy}%")
    print(f"{currency} - Mean Deviation: {mean_deviation:.2f}%")
    print(f"{currency} - Mean Deviation of Deviations: {mean_of_deviation:.2f}%")
    print(f"{currency} - Standard Deviation of Deviations: {std_deviation_of_deviation:.2f}%")
    print(f"{currency} - Null deviation rows removed (lack of data): {rows_removed}\n")

    # mean of deviations over time.
    df_cleaned['timestamp'] = pd.to_datetime(df_cleaned['timestamp'], unit='ms')  # Assuming Unix timestamp; adjust accordingly
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')  # Assuming Unix timestamp; adjust accordingly

    df_cleaned = df_cleaned.set_index('timestamp')
    df = df.set_index('timestamp')
    # Resample to daily frequency and calculate mean deviation
    daily_mean_deviation = df_cleaned['deviation'].resample('D').mean()
    daily_deviation_count = df_cleaned['deviation'].resample('D').count()
    plt.figure(figsize=(10, 6))
    daily_deviation_count.plot(title=f'Daily deviation count {currency}')

    # plot nan occurrencies per day
    daily_nan_count = df['deviation'].isna().resample('D').sum()
    # Plot daily NaN count
    plt.figure(figsize=(10, 6))
    daily_nan_count.plot(title=f'Daily NaN Count {currency}')
    plt.show()

    # Plotting
    plt.figure(figsize=(10, 6))
    daily_mean_deviation.plot(title=f'Mean Deviation Over Time for {currency}')
    plt.xlabel('Time')
    plt.ylabel('Mean Deviation (%)')
    plt.show()


