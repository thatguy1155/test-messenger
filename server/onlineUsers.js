
class UserId {
  constructor(value){
      this.value = value
      this.left = null
      this.right = null
  }
}

class BinarySearchTree {
      constructor(){
        this.root = null
      }
  insert(value){
        var newUserId = new UserId(value);
        //empty tree, this id is new root
        if(this.root === null){
            this.root = newUserId;
            return this;
        }
        let current = this.root;
        while(current){
            if(value === current.value) return undefined; //value already in tree. abort
            if(value < current.value){
                if(current.left === null){  //if end of left path, insert node
                    current.left = newUserId;
                    return this;
                }
                current = current.left;   //...otherwise go further left
            } else {
                if(current.right === null){ //if end of right path. insert node
                    current.right = newUserId;
                    return this;
                } 
                current = current.right; //...otherwise go further right
            }
        }
    };

  //finds if given user is active. returns bool
  contains(value){
    if(!this.root) return false
    let current = this.root
    let found = false
    while(current && !found){
          if(value < current.value){
            current = current.left
           } else if(value > current.value){
              current = current.right
           } else {
                found = true
           } 
          }
      //if there is no current.right or current.left, current will be undefined and the loop will exit
      if(!found) return undefined;
      return found
}
remove(value){
  this.root = this.removeId(this.root, value)
}

removeId(current, value) {
   //no node to delete 
 if(current === null) return current
  
  // found a node to delete
  if (value === current.value) {
       
      // deleted node has no child nodes or 1 child
      if (current.left === null && current.right === null){
              return null
          }else if(current.left === null){
              return current.right //move right node into deleted node's place up the tree
          }else if(current.right === null){
              return current.left  //move left node into deleted node's place up the tree
          }else{
              //node to be deleted has two children,  
              //get the next number sequentially ---> the leftmost value on the right side
              //copy the id value of that node to the node in the position previously occupied by the value to be deleted.
              let tempNode = this.smallestId(current.right)
                  current.value = tempNode.value
              // delete the aforementioned leftmost value on right side
                  current.right = this.removeId(current.right, tempNode.value)
              return current
          }
  // if no match on this level, go 1 level down
  }else if(value < current.value) {
      current.left = this.removeId(current.left, value)
      return current
  }else{
      current.right = this.removeId(current.right, value)
      return current
  }
}
  
  smallestId(node) {
      while(!node.left === null)
          node = node.left
      return node
  }

}
const OnlineUsers = new BinarySearchTree();
module.exports = OnlineUsers;