const rulesAdvanced =
{
    rock: {
        wins: {
            'scissors': 'Rock crushes scissors',
            'lizard': 'Rock crushes lizard',
        },
    },
    paper: {
        wins: {
            'rock': 'Paper covers rock',
            'spock': 'Paper disproves Spock'
        },
    },
    scissors: {
        wins: {
            'paper': 'Scissors cuts paper',
            'lizard': 'Scissors decapitate Lizard',

        },
    },
    lizard: {
        wins: {
            'spock': 'Lizard poisons Spock',
            'paper': 'Lizard eats paper',
        },
    },
    spock: {
        wins: {
            'scissors': 'Spock smashes scissors',
            'rock': 'Spock vaporizes rock',
        },
    },
}

export default rulesAdvanced


//if (picker in rulesAdvanced[chosen].wins) =>