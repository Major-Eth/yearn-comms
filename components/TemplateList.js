import	React					from	'react';
import	Link					from	'next/link';
import	Image					from	'next/image';
import	{parseMarkdownUnset}	from	'utils';
import	useLocalization			from	'contexts/useLocalization';

function	Template({path, allPosts}) {
	const	{language} = useLocalization();

	return (
		<section>
			<div className={'pt-2 w-full'}>
				<div className={'flex flex-col '}>
					<div className={'mb-8 masonry sm:masonry-sm md:masonry-md'}>
						{(allPosts || []).map((post, index) => {
							if (!post) {
								return (
									<div className={'mb-4 break-inside'} key={index}>
										<div className={'overflow-hidden w-full bg-white dark:bg-black rounded-sm cursor-pointer'}>
										</div>
									</div>
								);
							}
							return (
								<div className={'pb-6 break-inside'} key={post.slug}>
									<Link href={`/${path}/${post.slug}`}>
										<div className={'w-full bg-white dark:bg-black rounded-sm shadow-none hover:shadow-sm transition-shadow cursor-pointer'}>
											<div className={'flex w-full border-b border-gray-blue-3 dark:border-gray-2'}>
												<Image
													src={post?.image?.src || '/default.jpeg'}
													quality={90}
													objectFit={'cover'}
													loading={'eager'}
													className={'rounded-t-sm reduce-brightness'}
													width={post?.image?.width || 800}
													height={post?.image?.height || 445} />
											</div>
											<div className={'p-4'}>
												<div className={'flex flex-row justify-between mb-2 w-full'}>
													<p className={'text-xs text-gray-blue-1 dark:text-gray-3'}>{`by ${post?.author || 'Yearn'}`}</p>
													<p className={'text-xs text-gray-blue-1 dark:text-gray-3'}>
														{`${new Date(post?.date || '').toLocaleDateString(language, {weekday:'long', year:'numeric', month:'short', day:'numeric'})}`}
													</p>
												</div>
												<h2
													className={'font-title text-2xl font-bold text-dark-blue-1 dark:text-white'}
													dangerouslySetInnerHTML={{__html: parseMarkdownUnset(post?.title || '')}} />
											</div>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Template;