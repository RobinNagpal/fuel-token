library;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Identity);

    fn asset_id(sub_id: SubId) -> AssetId;
}
