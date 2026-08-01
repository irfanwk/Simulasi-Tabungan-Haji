import json
import pandas as pd
from datetime import datetime
import os

def load_data(filepath, col_name):
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    # Convert to DataFrame
    df = pd.DataFrame(data, columns=['timestamp', col_name])
    
    # Convert timestamp to date
    df['date'] = pd.to_datetime(df['timestamp'], unit='ms').dt.date
    
    # Drop timestamp and take the last price for each date if there are duplicates
    df = df.drop(columns=['timestamp'])
    df = df.groupby('date').last().reset_index()
    
    return df

def main():
    base_dir = '/home/miwk/Documents/Praktikum ML/Salimah/research/gold'
    buy_file = os.path.join(base_dir, 'antam_buy.json')
    sell_file = os.path.join(base_dir, 'antam_sell.json')
    output_file = os.path.join(base_dir, 'antam_prices.csv')
    
    df_buy = load_data(buy_file, 'harga_beli')
    df_sell = load_data(sell_file, 'harga_jual')
    
    # Merge on date
    df_merged = pd.merge(df_sell, df_buy, on='date', how='outer')
    
    # Sort by date
    df_merged = df_merged.sort_values('date')
    
    # Export to CSV
    df_merged.to_csv(output_file, index=False)
    print(f'Data successfully saved to {output_file}')

if __name__ == '__main__':
    main()
