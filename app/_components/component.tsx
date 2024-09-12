"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical } from "lucide-react"
import { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

// Define the type for our card items
type CardItem = {
    id: string
    title: string
    content: string
}

// Sample data for our cards
const initialCards: CardItem[] = [
    { id: "card1", title: "Card 1", content: "This is the content of card 1" },
    { id: "card2", title: "Card 2", content: "This is the content of card 2" },
    { id: "card3", title: "Card 3", content: "This is the content of card 3" },
    { id: "card4", title: "Card 4", content: "This is the content of card 4" },
]

export default function Component() {
    const [cards, setCards] = useState(initialCards)

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const newCards = Array.from(cards)
        const [reorderedItem] = newCards.splice(result.source.index, 1)
        newCards.splice(result.destination.index, 0, reorderedItem)

        setCards(newCards)
    }

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Sortable Card List</h1>
            <div className="">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="cardRow">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="grid grid-flow-col gap-x-4">
                                {cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="list-none"
                                            >
                                                <Card>
                                                    <CardHeader className="flex flex-row items-center">
                                                        <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                                            <GripVertical className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                        <CardTitle>{card.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{card.content}</p>
                                                    </CardContent>
                                                </Card>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}