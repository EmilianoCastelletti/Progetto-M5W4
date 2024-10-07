import { Button, ListGroup } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';


const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAzOWFiNDY5OGYxNzAwMTU2MDQ0MTciLCJpYXQiOjE3MjgyODk0NjAsImV4cCI6MTcyOTQ5OTA2MH0.jzvR4rAbs20PcnTNuMjpWlz4JcfQbajxM6irlFridpQ',
          },
        }
      )
      if (response.ok) {
        Swal.fire({
          title: 'Successo!',
          text: 'Il commento è stato eliminato con successo!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      } 
      else {
        throw new Error('La recensione non è stata eliminata!')
      }
    } catch (error) {
      alert(error)
    }
  }
 // Funzione per generare le stelle in base al rate
 const renderStars = (rate) => {
  const fullStars = Math.floor(rate) 
  const emptyStars = 5 - fullStars
  const stars = []

  // Aggiungi le stelle piene
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>)
  }

  // Aggiungi le stelle vuote
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={fullStars + i} className="bi bi-star text-warning"></i>)
  }

  return stars
}
return (
  <ListGroup.Item data-testid="single-comment">
    {comment.comment}
    <div className="stars mt-2">
      {renderStars(comment.rate)}
    </div>
    <Button
      variant="danger"
      className="ms-2"
      onClick={() => deleteComment(comment._id)}
    >
      Elimina
    </Button>
  </ListGroup.Item>
)
}

export default SingleComment
