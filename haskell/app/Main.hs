module Main where

import Lib
import System.IO
import Data.List.Split

main :: IO ()
main = do
    handle <- openFile "input.txt" ReadMode  
    contents <- hGetContents handle  
    putStr $ go contents  
    hClose handle

go:: [Char] -> String
go fileData =
    let
        fields:: [[Char]]
        fields = splitOn "," fileData
        header = head fields
        ret = 
            if header == "new-account" then
                createAccount fields
            else
                createTransaction fields
    in
        ret

type Account = (Int, [Char], Double)
type Transaction = (Int, Double)

data Model = Model { accounts :: [Account]  
               , transactions :: [Transaction]  
               } deriving (Show)  



createAccount:: [[Char]] -> [Char]
createAccount fields = 
    let 
        id = fields !! 1
        name = fields !! 2
        initialBalance = fields !! 3
    in
        "5"

createTransaction:: [[Char]] -> [Char]
createTransaction fields =
    let
        id = fields !! 1
        ammount = fields !! 2
    in
        "5"