new Vue ({
    name: 'game',
    el: '#app',

    data: state,
    // <card :def="testCard" @play="handlePlay" />
    template: `<div id="#app">
        <top-bar 
        :turn="turn" 
        :current-player-index="currentPlayerIndex" 
        :players="players" 
        />
        <transition name="hand">
        <hand :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
        </transition>
        <overlay v-if="activeOverlay">
            <overlay-content-player-turn
                v-if="activeOverlay === 'player-turn'" :player="currentPlayer" />
            <overlay-content-last-play
                v-else-if="activeOverlay ==='last-play'" :opponent="currentOpponent" />
            <overlay-content-game-over
                v-else-if="activeOverlay === 'game-over'" :players="players" />
        </overlay>
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
        // handlePlay () {
        //     console.log('you played a card')
        // },
    },
    created () {
        this.testHand = this.createTestHand ()
    },
})
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio ()
})