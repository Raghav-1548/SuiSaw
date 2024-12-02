# SuiSaw: Decentralized Open-Source AI Model Marketplace 🚀

> Revolutionizing AI model sharing and monetization through blockchain technology

## What? 🤔

SuiSaw is a groundbreaking decentralized marketplace that enables AI researchers and developers to monetize their machine learning models while allowing users to rent and utilize these models in a secure, transparent, and efficient manner. Built on the Sui blockchain, it provides a trustless environment for AI model transactions with real-time usage tracking and automatic payments.

## Why? 💡

The AI model marketplace is currently fragmented and centralized, leading to:
- Limited monetization options for AI researchers.
- High platform fees and middlemen.
- Lack of transparency in model usage.
- Complex licensing and usage tracking.
- No standardized payment system.
  
SuiSaw solves these problems by:
- Providing direct peer-to-peer model rentals
- Implementing transparent, blockchain-based tracking
- Automating payments through smart contracts
- Ensuring fair compensation for model creators
- Creating a decentralized ecosystem for AI innovation

## How? ⚙️

SuiSaw leverages cutting-edge technologies to create a seamless and secure marketplace:

### Smart Contract Architecture 🏗️
### rental.move

```move
module rental::rental {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use sui::clock::{Self, Clock};
    use std::option::{Self, Option}; 

    struct Rental has key {
        id: UID,
        model_id: String,
        user_id: String,
        start_time: u64,
        end_time: Option<u64>,
        price_per_hour: u64,
        status: u8 
    }

    struct RentalRegistry has key {
        id: UID,
        owner: address
    }

    const ERental_ALREADY_ENDED: u64 = 0;

    fun init(ctx: &mut TxContext) {
        let registry = RentalRegistry {
            id: object::new(ctx),
            owner: tx_context::sender(ctx)
        };
        transfer::share_object(registry);
    }

    public entry fun create_rental(
        _registry: &RentalRegistry,
        model_id: vector<u8>,
        user_id: vector<u8>,
        price_per_hour: u64,
        _clock: &Clock,  
        ctx: &mut TxContext
    ) {
        let rental = Rental {
            id: object::new(ctx),
            model_id: string::utf8(model_id),
            user_id: string::utf8(user_id),
            start_time: clock::timestamp_ms(_clock),
            end_time: option::none(),
            price_per_hour,
            status: 0 
        };
        transfer::share_object(rental);
    }

    public entry fun end_rental(
        rental: &mut Rental,
        _clock: &Clock 
    ) {
        assert!(option::is_none(&rental.end_time), ERental_ALREADY_ENDED);
        rental.end_time = option::some(clock::timestamp_ms(_clock));
        rental.status = 1; 
    }

    public entry fun fail_rental(
        rental: &mut Rental,
        _clock: &Clock 
    ) {
        assert!(option::is_none(&rental.end_time), ERental_ALREADY_ENDED);
        rental.end_time = option::some(clock::timestamp_ms(_clock));
        rental.status = 2; 
    }
}
```
### move.toml

```move
[package]
name = "rental"
version = "0.0.1"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }

[addresses]
rental = "0x0"
```




The smart contract implements:
- **Time-based Rental System**: Precise tracking of model usage duration
- **Flexible Pricing Model**: Dynamic per-hour pricing for different models
- **State Management**: Comprehensive rental status tracking (active/completed/failed)
- **Registry Pattern**: Centralized rental tracking with decentralized execution

### Technical Stack 🛠️

#### Blockchain
- **Sui Move**: Next-gen smart contract language
- **Object-Centric Model**: Efficient state management
- **Parallel Execution**: High throughput for rental operations
- **Built-in Events**: Real-time rental status updates

#### Frontend
- **React 18.3**: Latest React features with concurrent rendering
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **TailwindCSS**: Utility-first styling
- **Zustand**: Efficient state management
- **React Router**: Client-side routing
- **Lucide Icons**: Beautiful, consistent iconography

#### Authentication & Security
- **Sui Wallet Integration**: Secure blockchain transactions
- **Form Validation**: Zod schema validation
- **Protected Routes**: Role-based access control
- **Persistent Storage**: Local state persistence

### Key Features 🌟

1. **Model Upload System**
   - Direct model integration
   - Hosted model support
   - Automatic verification
   - Custom pricing settings

2. **Rental Management**
   ```typescript
   interface Rental {
     id: string;
     modelId: string;
     userId: string;
     startTime: number;
     endTime: number | null;
     pricePerHour: number;
     status: 'active' | 'completed' | 'failed';
   }
   ```

3. **Real-time Chat Integration**
   - Direct model interaction
   - System prompt customization
   - Message history tracking
   - Status monitoring

4. **Wallet Integration**
   - Real-time balance updates
   - Transaction history
   - Automatic payments
   - Faucet integration

### Smart Contract Integration 🔗

```typescript
export const createRental = async (
  modelId: string,
  userId: string,
  pricePerHour: number
) => {
  const tx = new TransactionBlock();
  
  tx.moveCall({
    target: `${CONTRACT_ADDRESS}::rental::create_rental`,
    arguments: [
      tx.pure(modelId),
      tx.pure(userId),
      tx.pure(Math.floor(pricePerHour * 1e9)),
      tx.pure(Date.now())
    ],
  });

  return await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
  });
};
```

### Performance Optimizations ⚡

1. **Blockchain**
   - Parallel transaction execution
   - Optimized data structures
   - Event-driven updates
   - Minimal on-chain storage

2. **Frontend**
   - Code splitting
   - Fast loading
   - Optimistic updates

### Security Measures 🔒

1. **Smart Contract**
   - Access control
   - Input validation
   - Reentrancy protection
   - Error handling

2. **Frontend**
   - Form validation
   - Rate limiting
   - Error boundaries
   - Secure storage

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/suisaw.git
   cd suisaw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Add your Sui testnet configuration
   ```

4. **Deploy smart contract**
   ```bash
   cd rental_contract
   sui move build
   sui client publish --gas-budget 100000000
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Testing 🧪

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run contract tests
sui move test
```

## Contributing 🤝

We welcome contributions! Please see our Contributing Guide (Coming soon) for details.

## License 📄

This project is being licensed under the MIT License.
## Acknowledgments 👏

- Sui Foundation for blockchain infrastructure
- Unfold24 for the oppurtunity to BUIDL
- The amazing open-source community

---

<p align="center">
  Built with ❤️ by  Team BrokeBad  
</p>

<p align="center">
  <a href="https://suiexplorer.com/address/0xe68ee84cfd0706d5b51495af25793f1884eaff9cc0320364ef8577676fabe6af?network=testnet">View on Sui Explorer</a>
</p>
