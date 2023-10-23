export const useApiResponseMapper = () => {
  const mapper = (response: any, structure: string) => {
    const responseData = response.value?.data;
    if (!responseData) return [];

    return responseData.map((data: any) => {
      const { id, attributes } = data;
      switch (structure) {
        case 'project': {
          const { name, description, startDate, endDate, user, status, statusColor, image, shared } = attributes;
          const imageUrl = image.data?.attributes.url;
          return {
            id,
            name,
            description,
            startDate,
            endDate,
            user,
            status,
            statusColor,
            image: {
              url: imageUrl ? `https://pixeltronic.info/strapi/${imageUrl}` : null,
              alternativeText: image.data?.attributes.alternativeText ?? '',
              caption: image.data?.attributes.caption ?? '',
            },
            shared,
          };
        }
        case 'comment': {
          const { projectId, comments, commentedOn, commentedBy } = attributes;
          return {
            id,
            projectId,
            comments,
            commentedOn,
            commentedBy,
          };
        }
        case 'milestone': {
          const { projectId: milestoneProjectId, name, status, statusColor } = attributes;
          return {
            id,
            projectId: milestoneProjectId,
            name,
            status,
            statusColor,
          };
        }
        case 'material': {
          const { projectId: materialProjectId, name, quantity, acquired } = attributes;
          return {
            projectId: materialProjectId,
            name,
            quantity,
            acquired,
          };
        }
        default:
          return {};
      }
    });
  };

  return {
    mapper,
  };
};
