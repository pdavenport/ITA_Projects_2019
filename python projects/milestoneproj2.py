import random
import os

#init lists
suits = ('Hearts', 'Diamonds', 'Spades', 'Clubs')
titles = ('Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace')
values = {
    'Two':2, 'Three':3, 'Four':4, 'Five':5, 'Six':6, 
    'Seven':7, 'Eight':8, 'Nine':9, 'Ten':10, 'Jack':10, 
    'Queen':10, 'King':10, 'Ace':11
    }

playing = True

class Card:
    def __init__(self,suit,title):
        self.suit = suit
        self.title = title
    def __str__(self):
        return self.title + ' of ' + self.suit
    
class Deck:
    def __init__(self):
        self.deck = []
        for suit in suits:
            for title in titles:
                self.deck.append(Card(suit,title))
    def __str__(self):
        deck_comp = ''
        for card in self.deck:
            deck_comp += '\n '+card.__str__()
        return 'The deck has:' + deck_comp
    def shuffle(self):
        random.shuffle(self.deck)
    def deal(self):
        single_card = self.deck.pop()
        return single_card
    
class Hand:
    def __init__(self):
        self.cards = []
        self.value = 0
        self.aces = 0
    def add_card(self,card):
        self.cards.append(card)
        self.value += values[card.title]
        if card.title == 'Ace':
            self.aces += 1
    def adjust_for_ace(self):
        while self.value > 21 and self.aces:
            self.value -= 10
            self.aces -= 1
            
class Chips:
    
    def __init__(self):
        self.total = 100
        self.bet = 0
        
    def win_bet(self):
        self.total += self.bet
    
    def lose_bet(self):
        self.total -= self.bet

def take_bet(chips):
    while True:
        try:
            chips.bet = int(input('How many chips ya wanna bet?'))
        except ValueError:
            print('We use numbers around here, buddy')
        else:
            if chips.bet > chips.total:
                print("'You tryina take out a loan, pal? Try betting the chips you have...'",chips.total)
            else:
                break

def hit(deck,hand):
    hand.add_card(deck.deal())
    hand.adjust_for_ace()
    
def hit_or_stand(deck,hand):
    global playing
    
    while True:
        x = input("Type 'h' for another card, or 's' to play with the cards you have")
        
        if x[0].lower() == 'h':
            hit(deck,hand)
            os.system('clear')

        elif x[0].lower() == 's':
            print("'Standin'? Alright.'")
            playing = False

        else:
            print("type 'h' or 's'")
            continue
        break

    
def show_some(player,dealer):
    print("\nDealer's Hand:")
    print(" Turned over card")
    print('',dealer.cards[1])  
    print("\nPlayer's Hand:", *player.cards, sep='\n ')
    
def show_all(player,dealer):
    print("\nDealer's Hand:", *dealer.cards, sep='\n ')
    print("Dealer's Hand =",dealer.value)
    print("\nPlayer's Hand:", *player.cards, sep='\n ')
    print("Player's Hand =",player.value)
    
def player_busts(player,dealer,chips):
    print("'Heh, you got too greedy, bud.'")
    chips.lose_bet()

def player_wins(player,dealer,chips):
    print("'Alright pal, you win this time...'")
    chips.win_bet()

def dealer_busts(player,dealer,chips):
    print("'Dangit I went over again..'")
    chips.win_bet()
    
def dealer_wins(player,dealer,chips):
    print("'Better luck next time, stranger. Heh.'")
    chips.lose_bet()
    
def push(player,dealer):
    print("'Looks like no one wins 'round here.'")

while True:
    os.system('clear')
    print('Instructions: draw cards to get as close to 21 without going over, or get 21.\nThe dealer hits until he reaches 17.\nAces are valued at 1 or 11\nYou have 100 chips to start with.')

    deck = Deck()
    deck.shuffle()
    
    player_hand = Hand()
    player_hand.add_card(deck.deal())
    player_hand.add_card(deck.deal())
    
    dealer_hand = Hand()
    dealer_hand.add_card(deck.deal())
    dealer_hand.add_card(deck.deal())
    
    player_chips = Chips()
    
    take_bet(player_chips)
    os.system('clear')

    show_some(player_hand,dealer_hand)
    
    while playing:
        
        hit_or_stand(deck,player_hand)
        show_some(player_hand,dealer_hand)
        
        if player_hand.value > 21:
            player_busts(player_hand,dealer_hand,player_chips)
            break
         
    if player_hand.value <= 21:
        
        while dealer_hand.value < 17:
            hit(deck,dealer_hand)
            
        os.system('clear')
        show_all(player_hand,dealer_hand)
        
        if dealer_hand.value > 21:
            dealer_busts(player_hand,dealer_hand,player_chips)

        elif dealer_hand.value > player_hand.value:
            dealer_wins(player_hand,dealer_hand,player_chips)

        elif dealer_hand.value < player_hand.value:
            player_wins(player_hand,dealer_hand,player_chips)

        else:
            push(player_hand,dealer_hand)

    print("\nYour total chips are: ",player_chips.total)
    
    new_game = input("You wanna try your luck again, buddy? Press 'y' for yes or 'n' for no")
    if new_game[0].lower()=='y':
        playing=True
        continue
    else:
        os.system('clear')
        print("See ya 'round, boss")
        break