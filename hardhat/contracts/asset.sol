// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Asset {
    address private owner;
    string private tokenName;
    string private tokenSymbol;

    constructor(string memory _token, string memory _symbol) {
        owner = msg.sender;
        tokenName = _token;
        tokenSymbol = _symbol;
    }

    //events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    struct Record {
        uint256 currentRate;
        uint256 quantity;
        uint256 amountPaid;
        uint256 timestamp;
    }

    mapping(address => Record) private accountToRecord;
    mapping(address => Record[]) private recordHistory;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    function buy(
        address _account,
        uint256 _currentRate,
        uint256 _quantity,
        uint256 _amountPaid,
        uint256 _timestamp
    ) public onlyOwner {
        require(_account != address(0), "account can't be empty");
        require(_currentRate != 0, "currentRate can't be empty");
        require(_quantity != 0, "quantity can't be empty");
        require(_amountPaid != 0, "amount paid can't be empty");
        require(_timestamp != 0, "timestamp paid can't be empty");

        Record memory record = Record(
            _currentRate,
            _quantity,
            _amountPaid,
            _timestamp
        );
        recordHistory[_account].push(record);
        accountToRecord[_account] = record;
    }

    function getRecord(
        address _account
    ) public view onlyOwner returns (Record memory) {
        require(_account != address(0), "account can't be empty");
        return accountToRecord[_account];
    }

    function getHistory(
        address _account
    ) public view onlyOwner returns (Record[] memory) {
        require(_account != address(0), "account can't be empty");
        return recordHistory[_account];
    }

    // erc20 methods

    function name() public view returns (string memory) {
        return tokenName;
    }

    function symbol() public view returns (string memory) {
        return tokenSymbol;
    }

    function decimals() public view returns (uint8) {}

    function totalSupply() public view returns (uint256) {}

    function balanceOf(address _owner) public view returns (uint256 balance) {}

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {}

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {}

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {}

    function allowance(
        address _owner,
        address _spender
    ) public view returns (uint256 remaining) {}
}
