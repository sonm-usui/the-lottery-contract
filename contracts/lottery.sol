pragma solidity ^0.4.24;

contract Lottery {
     address public manager;
     address[] public customers;

     constructor() public {
         manager = msg.sender;
     }

     function enter() payable public {
         require(msg.value > 0.1 ether);

           customers.push(msg.sender);
     }

     function getCustomers() public view returns (address[]) {
         return customers;
     }

     function getRandomNumber() private view returns (uint) {
         return uint(keccak256(block.difficulty, now, customers));
     }

     function selectWinner() public restrictedUser {
         uint index = getRandomNumber() % customers.length;
         customers[index].transfer(this.balance);
         customers = new address[](0);
     }

      modifier restrictedUser() {
        require(msg.sender == manager);
        _;
      }

}
