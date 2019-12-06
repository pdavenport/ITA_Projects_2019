#milstone project 1
import os #for clearing the terminal
from itertools import cycle #for cycling players

board = ["empty"," "," "," "," "," "," "," "," "," "] #an 'empty' list so we can add values
instructions = ["empty","1","2","3","4","5","6","7","8","9"] #the instructions guide
players = [] #the empty players list for who is 'X' and who is 'O'

def player_choice(): #where we define what player 1 and player 2 are
    player_input = ""
    while player_input != "X" and player_input != "O" and player_input != "x" and player_input != "o":
        player_input = input("Player one, are you X or are you O?").upper()
        if player_input == "X":
            players.append("X")
            players.append("O")
        else:
            players.append("O")
            players.append("X")
    
    

def print_board(board): #function to display the current tictactoe board
    print(board[7]+"|"+board[8]+"|"+board[9])
    print("- - -")
    print(board[4]+"|"+board[5]+"|"+board[6])
    print("- - -")
    print(board[1]+"|"+board[2]+"|"+board[3])
    print("")

def make_move(which_player): #accepts a parameter of which player is making a move
    p_move = None #define as None to start
    #while p_move is anything we don't want, ask the player to make an input
    while ( 
            p_move != 1 and p_move != 2 and p_move != 3 and p_move != 4 and 
            p_move != 5 and p_move != 6 and p_move != 7 and p_move != 8 and 
            p_move != 9 and p_move != 'guide'
        ):
        p_move = input("Player "+which_player+", select a number:")
        if p_move == 'guide': # print the instructions if they enter guide, make sure the same player plays next
            print_board(instructions)
            make_move(which_player)
        else:
            p_move = int(p_move)
            os.system('clear') # clear the terminal
            if players[0] == board[p_move]: # if player 1 picks a spot he's already played, ask again
                print_board(board)
                make_move(which_player)
            elif players[1] == board[p_move]: # if player 2 picks a spot he's already played, ask again
                print_board(board)
                make_move(which_player)
            else:
                board.pop(p_move) # if it's a new spot, delete the placeholder value
                board.insert(p_move, which_player) # insert X or O into the list
                print_board(board) # display the board

def game_start():
    alter = cycle(range(2)) # allows us to alternate who's going
    while True: # alternate forever until we stop
        make_move(players[next(alter)]) # call the function make_move with alternating players
        if ( #if any of these statements are true...
        (board[1] == board[2] == board[3] == 'X') or 
        (board[4] == board[5] == board[6] == 'X') or  
        (board[7] == board[8] == board[9] == 'X') or  
        (board[1] == board[4] == board[7] == 'X') or 
        (board[2] == board[5] == board[8] == 'X') or  
        (board[3] == board[6] == board[9] == 'X') or  
        (board[1] == board[5] == board[9] == 'X') or  
        (board[7] == board[5] == board[3] == 'X') or 
        (board[1] == board[2] == board[3] == 'O') or 
        (board[4] == board[5] == board[6] == 'O') or  
        (board[7] == board[8] == board[9] == 'O') or  
        (board[1] == board[4] == board[7] == 'O') or 
        (board[2] == board[5] == board[8] == 'O') or  
        (board[3] == board[6] == board[9] == 'O') or  
        (board[1] == board[5] == board[9] == 'O') or  
        (board[7] == board[5] == board[3] == 'O')
        ):
            print("Congratulations!! You win!!\n") # you win!
            break # break the loop so we don't keep playing


player_choice()
os.system('clear')
print("Player one is: "+players[0]+", Player two is: "+players[1])
print("Instructions: Player one, using the guide below, select a number to place an '"+players[0]+"'.\nPlayer two, use the same guide to place an '"+players[1]+"'. \nThree in a row for either player wins.\n")
print_board(instructions)
print("At any time, type 'guide' for numbers guide\n")
game_start()
