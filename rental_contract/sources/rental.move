module rental::rental {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use sui::clock::{Self, Clock};
    use std::option::{Self, Option}; // Added option module import

    struct Rental has key {
        id: UID,
        model_id: String,
        user_id: String,
        start_time: u64,
        end_time: Option<u64>,
        price_per_hour: u64,
        status: u8 // 0: active, 1: completed, 2: failed
    }

    struct RentalRegistry has key {
        id: UID,
        owner: address
    }

    // Error codes
    const ERental_ALREADY_ENDED: u64 = 0;
    // Removed unused constant EINVALID_STATUS

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
        _clock: &Clock, // Prefixed with underscore to suppress unused variable warning
        ctx: &mut TxContext
    ) {
        let rental = Rental {
            id: object::new(ctx),
            model_id: string::utf8(model_id),
            user_id: string::utf8(user_id),
            start_time: clock::timestamp_ms(_clock),
            end_time: option::none(),
            price_per_hour,
            status: 0 // active
        };
        transfer::share_object(rental);
    }

    public entry fun end_rental(
        rental: &mut Rental,
        _clock: &Clock // Prefixed with underscore to suppress unused variable warning
    ) {
        assert!(option::is_none(&rental.end_time), ERental_ALREADY_ENDED);
        rental.end_time = option::some(clock::timestamp_ms(_clock));
        rental.status = 1; // completed
    }

    public entry fun fail_rental(
        rental: &mut Rental,
        _clock: &Clock // Prefixed with underscore to suppress unused variable warning
    ) {
        assert!(option::is_none(&rental.end_time), ERental_ALREADY_ENDED);
        rental.end_time = option::some(clock::timestamp_ms(_clock));
        rental.status = 2; // failed
    }
}