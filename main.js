new Vue ({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app">
        <top-bar 
        :turn="turn" 
        :current-player-index="currentPlayerIndex" 
        :players="players" 
        />
        <transition name="hand">
        <card :def="testCard" @play="handlePlay" />
        </transition>
    </div>`,
    mounted () {
        console.log(this.$data === state)
    },
    computed: {
        testCard () {
            return cards.archers
        },
    },
    methods: {
        createTestHand () {
            const cards = []
            const ids = Object.keys(cards)
            for (let i = 0; i < 5; i++) {
                cards.push(this.testDrawCard())
            }
            return cards
        },
        testDrawCard () {
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId],
            }
        },
        testPlayCard (card) {
            const index = this .testHand.indexOf(card)
            this.testHand.splice(index, 1)
        },
        handlePlay () {
            console.log('you played a card')
        },
    },
    created () {
        this.testHand = this.createTestHand ()
    },
})
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio ()
})