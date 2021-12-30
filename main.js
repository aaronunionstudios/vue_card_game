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
        <transition name="fade">
        <hand :cards="testHand" v-if="!activeOverlay" />
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
        handlePlay () {
            console.log('You played a card!')
        },
        createTestHand () {
            const cards = []
            const ids = Object.keys(cards)
            for (let i = 0; i < 5; i++) {
                console.log(ids)
                cards.push(testDrawCard())
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
    },
    created () {
        this.testHand = this.createTestHand ()
    },
})
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio ()
})