package vn.codegym.flightagency.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.flightagency.model.Ticket;
import vn.codegym.flightagency.repository.TicketRepository;
import vn.codegym.flightagency.service.TicketService;

import javax.transaction.Transactional;


@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public Page<Ticket> findAllByName(String search, Pageable pageable) {
        return ticketRepository.findAllByNameContaining(search,pageable);
    }

    @Override
    public Page<Ticket> findAllByFlight(String search, Pageable pageable) {
        return ticketRepository.findAllByDepartureContaining(search,pageable);
    }

    @Override
    public Page<Ticket> findAllByBookingCode(String search, Pageable pageable) {
        return ticketRepository.findAllByBookingCodeContaining(search,pageable);
    }

    @Override
    public void save(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    @Override
    public void deleteById(Long id) {
        ticketRepository.deleteById(id);
    }

    @Override
    public Ticket findById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }
}
