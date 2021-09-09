import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useFetching } from './../hooks/useFetching';
import PostService from './../API/PostService';
import { Loader } from '../components/UI/Loader/Loader';

export const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data);
	});

	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsByPostId(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);

	return (
		<div>
			{isLoading
				? <Loader /> :
				<div>
					<h1>{post.id}. {post.title}</h1>
					<p>{post.body}</p>


					<h2 style={{ marginTop: 30 }}>Comments</h2>
					{isComLoading
						? <Loader />
						: <div>
							{comments.map(comm =>
								<div key={comm.id} style={{ marginTop: 15 }}>
									<h5>{comm.email}</h5>
									<div>{comm.body}</div>
								</div>
							)}
						</div>
					}
				</div>
			}




		</div>
	);
};
