# script to run to analyze the deviation data. Histograms, boxplots, and metrics are generated for each currency analyzed.
import pandas as pd
import matplotlib.pyplot as plt
import json

THRESHOLD=0.1

with open('dev_amplitude.json', 'r') as file:
    data = json.load(file)

dfs = {currency: pd.DataFrame(records) for currency, records in data.items()}

for currency, df in dfs.items():
    original_count = df.shape[0]
    
    # Filter out rows where deviation is NaN or less than the threshold
    df_cleaned = df.dropna(subset=['deviation'])
    df_cleaned = df_cleaned[df_cleaned['deviation'] > THRESHOLD]
    
    cleaned_count = df_cleaned.shape[0]
    
    rows_removed = original_count - cleaned_count
    
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
    first_timestamp = df_cleaned['timestamp'].min()
    last_timestamp = df_cleaned['timestamp'].max()
    mean_deviation = df_cleaned['deviation'].mean()
    std_deviation = df_cleaned['deviation'].std()
    deviations_above_threshold = df_cleaned[df_cleaned['deviation'] > 0.1]
    percentage_above_threshold = (deviations_above_threshold.shape[0] / cleaned_count) * 100

    print(f"{currency} - Analysis from: {first_timestamp}")
    print(f"{currency} - Analysis to: {last_timestamp}")
    print(f"{currency} - Deviation events: {count}")
    print(f"{currency} - Average Deviation: {mean_deviation:.2f}%")
    print(f"{currency} - Standard Deviation of Deviations: {std_deviation:.2f}%")
    print(f"{currency} - Null deviation rows removed (lack of data): {rows_removed}\n")
