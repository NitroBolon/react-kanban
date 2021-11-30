import EditIcon from '../../../../../assets/editIcon'
import { useState } from 'react'
import CardForm from '../Column/components/CardAdder/components/CardForm'

export default function ({ children: card, dragging, allowRemoveCard, onCardRemove, allowEditCard, onCardEdit }) {
  const [edit, setEdit] = useState(false)
  const [initialTitle, setInitialTitle] = useState(card.title)
  const [initialDescription, setInitialDescription] = useState(card.description)

  const confirmCard = (column) => {
    onCardEdit(card, column.title, column.description)
    setInitialTitle(column.title)
    setInitialDescription(column.description)
    setEdit(false)
  }

  return !edit ? (
    <div onClick={() => setEdit(true)} className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      <span>
        <div className='react-kanban-card__title'>
          <span>{card.title}</span>
          <div>
            {allowEditCard && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setEdit(true)
                  onCardEdit(card)
                }}
              >
                {EditIcon()}
              </span>
            )}
            {allowRemoveCard && (
              <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
                ×
              </span>
            )}
          </div>
        </div>
      </span>
      <div className='react-kanban-card__description'>{card.description}</div>
    </div>
  ) : (
    <CardForm
      onConfirm={confirmCard}
      onCancel={() => setEdit(false)}
      initialValue={{ title: initialTitle, description: initialDescription }}
      isEdit={edit}
    />
  )
}
