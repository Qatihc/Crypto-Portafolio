import React, { useState, useEffect } from 'react';

const CoinTransactionsSubtable = ({ row }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [])

  if (isLoading) return '/.....'

  return 'cargoo'
}

export default CoinTransactionsSubtable