class Avatar {
  getAllDefaultAvatars() {
    return [
      "bird",
      "bunny",
      "cardinal",
      "cat",
      "chicken",
      "cow",
      "crab",
      "dachshund",
      "dog",
      "dolphin",
      "duck",
      "fish",
      "frog",
      "horse",
      "jellyfish",
      "octopus"
    ];
  }
  randomAvatar() {
    const num = Math.floor(Math.random() * 15);
    const avatar = this.getAllDefaultAvatars()[num] + '.png';
    return avatar;
  }
}
aa = new Avatar();

module.exports = {
  randomAvatar: aa.randomAvatar()
};
