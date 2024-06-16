/**
 * This is just a basic Trie implemtation.The only tweaks I had to do
 * store the ids that are associated with a word-stop.
 */

export class TrieNode {
    constructor(){
        this.is_word = false;
        this.children = {};
        this.ids = new Set();
    }
}


export class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(word, id) {
        let start = this.root;
        for (let char of word) {
            if (!start.children[char]) {
                start.children[char] = new TrieNode();
            }
            start = start.children[char];
            start.ids.add(id)
        }
        start.is_word = true;
    }

    search(word) {
        let start = this.root;
        for (let char of word) {
            if (!start.children[char]) {
                return [];
            }
            start = start.children[char];
        }
        return [...start.ids];
    }
}