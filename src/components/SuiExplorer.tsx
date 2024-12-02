import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useRentalStore } from '../store/rentalStore';

const SuiExplorer = () => {
  const { rentals } = useRentalStore();
  const CONTRACT_ADDRESS = '0xe68ee84cfd0706d5b51495af25793f1884eaff9cc0320364ef8577676fabe6af';

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href={`https://suiexplorer.com/address/${CONTRACT_ADDRESS}?network=testnet`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <span>View on Sui Explorer</span>
        <ExternalLink size={16} />
      </a>
    </div>
  );
};

export default SuiExplorer;