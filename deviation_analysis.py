import pandas as pd
import matplotlib.pyplot as plt
import json

with open('dev.json', 'r') as file:
    data = json.load(file)

dfs = {currency: pd.DataFrame(records) for currency, records in data.items()}

for currency, df in dfs.items():
    # Original count of rows
    original_count = df.shape[0]
    
    # Remove rows where deviation is null
    df_cleaned = df.dropna(subset=['deviation'])
    
    # Count of rows after removal
    cleaned_count = df_cleaned.shape[0]
    
    # Calculate how many rows were removed
    rows_removed = original_count - cleaned_count
    
    # Proceed with the cleaned DataFrame
    # Histogram
    plt.figure(figsize=(10, 6))
    df_cleaned['deviation'].plot(kind='hist', bins=100, title=f'Deviations Histogram for {currency}')
    plt.xlabel('Deviation (%)')
    plt.ylabel('Frequency')
    plt.show()

    # Boxplot
    plt.figure(figsize=(10, 6))
    df_cleaned.boxplot(column=['deviation'])
    plt.title(f'Boxplot of Deviations for {currency}')
    plt.ylabel('Deviation (%)')
    plt.show()

    # Metrics
    count = df_cleaned['deviation'].count()
    mean_deviation = df_cleaned['deviation'].mean()
    std_deviation = df_cleaned['deviation'].std()
    
    # Print metrics and count of null deviation rows removed
    print(f"{currency} - Number of Deviations: {count}")
    print(f"{currency} - Average Deviation: {mean_deviation:.2f}%")
    print(f"{currency} - Standard Deviation of Deviations: {std_deviation:.2f}%")
    print(f"{currency} - Null deviation rows removed (lack of data): {rows_removed}\n")
