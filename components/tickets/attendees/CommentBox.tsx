import Loading from '@/components/general/Loading';
import { Textarea } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface CommentBoxProps {
  ticket_id: any;
  closeComment: any;
}

const CommentBox = ({ ticket_id, closeComment }: CommentBoxProps) => {

  const [commentLoading, setCommentLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [comment, setComment] = useState('')

  useEffect(() => {
    const getComment = async () => {
      try {
        setCommentLoading(true);
        const res = await axios.get('/api/comments/get', {
          params: { ticket_id },
        });
        // The GET route returns { comment: <row> }
        setComment(res.data?.comment?.comment || '');
      } catch (err) {
        console.error('Failed to fetch comment', err);
        setComment('');
      } finally {
        setCommentLoading(false);
      }
    };

    getComment();
  }, [ticket_id]);

  const handleComment = async () => {
    try {
      setSaveLoading(true);
      try {
        await axios.patch('/api/comments/update', { ticket_id, comment: comment.trim() });
      } catch (err: any) {
        console.log('ERR STATUS:', err?.response?.status);
        console.log('ERR BODY:', err?.response?.data); // <- shows { error, details }
      }
      closeComment();
    } catch (err) {
      console.error('Failed to save comment', err);
    } finally {
      setSaveLoading(false);
    }
  }

  if (commentLoading) {
    return <Loading />
  }
  return (
    <div>
      <div className='w-[550px] h-[350px] flex flex-col justify-center items-center gap-[5px]'>
        <Textarea
          placeholder="Your comment"
          className='h-full w-full'
          minRows={15}
          maxRows={15}
          autosize
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          disabled={commentLoading || saveLoading}
        />
      </div>
      <div className='flex justify-between px-[180px] items-center w-full gap-[10px]'>
          <button onClick={closeComment} className='bg-black w-full h-[35px] mt-[10px] text-white rounded-md hover:opacity-80 transition-all duration-200 shadow cursor-pointer'>
              <div className='flex items-center justify-center gap-[5px]'>
                  <IconX stroke={1.5} size={20} color='white' />
                  <p className='text-sm'>close</p>
              </div>
          </button>
          <button
            onClick={handleComment}
            disabled={saveLoading || commentLoading}
            className={`bg-green-600 w-full h-[35px] mt-[10px] text-white rounded-md transition-all duration-200 shadow cursor-pointer ${
              saveLoading || commentLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
            }`}
          >
              <div className='flex items-center justify-center gap-[5px]'>
                  {
                      saveLoading ? <Loading color='white' size={15} />
                      :
                          <>
                              <IconCheck stroke={1.5} size={20} color='white' />
                              <p className='text-sm'>save</p>
                          </>
                  }
              </div>
          </button>
      </div>
    </div>
  )
}

export default CommentBox