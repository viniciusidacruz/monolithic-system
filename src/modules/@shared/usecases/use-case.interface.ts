export interface UseCaseInterface<UseCaseInputDTO, UseCaseOutputDTO> {
	execute(input: UseCaseInputDTO): Promise<UseCaseOutputDTO>;
}
