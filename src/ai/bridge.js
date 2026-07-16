// Ponte de IA do protocolo eav20 — builders das transações que ligam a rede
// EAV7 a agentes de inteligência artificial.
//
// Fluxo on-chain:
//   1. AI_TASK        — usuário escrowa a recompensa e publica o prompt
//   2. ORACLE_REGISTER — operador stakea EAV7 para atuar como oráculo de IA
//   3. AI_RESULT      — oráculo entrega o output; a hash E7 do resultado fica
//                       gravada on-chain e a recompensa é liberada para ele
import { buildTransaction } from '../core/transaction.js';
import { eavHash } from '../crypto/hash.js';

// AI_TASK: oráculo designado (Fase 1), quórum de N (Fase 2, `quorum`) ou ABERTA/leilão
// (Fase 4, `open: true` — `reward` vira o orçamento máximo).
export function buildAiTaskTx(wallet, { prompt, oracle = null, quorum = null, open = false, model = null, params = null, reward, nonce, timestamp }) {
  const data = open ? { prompt, open: true, model, params }
    : quorum != null ? { prompt, quorum, model, params }
    : { prompt, oracle, model, params };
  return buildTransaction(wallet, { type: 'AI_TASK', amount: reward, nonce, timestamp, data });
}

// Fase 4 — leilão.
export function buildAiBidTx(wallet, { taskId, price, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_BID', nonce, timestamp, data: { taskId, price: String(price) } });
}
export function buildAiAwardTx(wallet, { taskId, oracle, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_AWARD', nonce, timestamp, data: { taskId, oracle } });
}

// Compromisso de commit-reveal: hash(output|salt). O oráculo commita isto e só
// depois revela (output, salt) — impede copiar a resposta de outro oráculo.
export function aiCommitHash(output, salt) {
  return eavHash(`${output}|${salt}`);
}

export function buildAiCommitTx(wallet, { taskId, commit, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_COMMIT', nonce, timestamp, data: { taskId, commit } });
}

export function buildAiRevealTx(wallet, { taskId, output, salt, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_REVEAL', nonce, timestamp, data: { taskId, output, salt } });
}

// Fase 3 — janela de desafio.
// Liquida uma tarefa não contestada (paga o oráculo) — permissionless.
export function buildAiClaimTx(wallet, { taskId, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_CLAIM', nonce, timestamp, data: { taskId } });
}
// Contesta um resultado (posta a fiança AI_CHALLENGE_BOND).
export function buildAiChallengeTx(wallet, { taskId, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_CHALLENGE', nonce, timestamp, data: { taskId } });
}
// Voto de oráculo-jurado numa disputa (valid = true/false).
export function buildAiVerdictTx(wallet, { taskId, valid, nonce, timestamp }) {
  return buildTransaction(wallet, { type: 'AI_VERDICT', nonce, timestamp, data: { taskId, valid: !!valid } });
}

// Reembolso do escrow ao solicitante após o prazo da tarefa.
export function buildAiRefundTx(wallet, { taskId, nonce, timestamp }) {
  return buildTransaction(wallet, {
    type: 'AI_REFUND',
    nonce,
    timestamp,
    data: { taskId },
  });
}

// Confirmação on-chain de que um BRIDGE_OUT foi pago na cadeia externa.
export function buildBridgeSettleTx(wallet, { transferId, externalTxHash = null, nonce, timestamp }) {
  return buildTransaction(wallet, {
    type: 'BRIDGE_SETTLE',
    nonce,
    timestamp,
    data: { transferId, externalTxHash },
  });
}

export function buildOracleRegisterTx(wallet, { stake, endpoint = null, nonce, timestamp }) {
  return buildTransaction(wallet, {
    type: 'ORACLE_REGISTER',
    amount: stake,
    nonce,
    timestamp,
    data: endpoint ? { endpoint } : {},
  });
}

export function buildAiResultTx(wallet, { taskId, output, nonce, timestamp }) {
  return buildTransaction(wallet, {
    type: 'AI_RESULT',
    nonce,
    timestamp,
    data: { taskId, output },
  });
}
